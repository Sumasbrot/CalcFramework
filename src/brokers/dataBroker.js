/**
 * @file dataBroker.js
 * @module dataBroker
 * @description Contains all of the mid level data processing functions,
 * and also acts as on interface for calling the fileOperations.
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Vlad Sorokin
 * @date 2021/10/21
 * @copyright Copyright © 2021-… by Vlad Sorokin. All rights reserved
 */

 var fileOperations = require('../executrix/fileOperations');
 var configurator = require('../executrix/configurator');
 var path = require('path');
 var baseFileName = path.basename(module.filename, path.extname(module.filename));
 var namespacePrefix = `cotrollers.${baseFileName}.`;

/**
 * @function scanDataPath
 * @description Scans the specified path and returns a collection
 * of all the files contained recursively within that path and all sub-folders.
 * @param {string} dataPath The that that should be recursively scaned for files in all the folders.
 * @return {array<string>} An array of the specified path including sub-folders
 * at all levels of the specified path including sub-folders.
 * @author Vlad Sorokin
 * @date 2021/10/21
 */
 function scanDataPath(dataPath) {
   let functionName = scanDataPath.name;
   console.log(`BEGIN ${namespacePrefix}${functionName} function`);
   console.log(`dataPath is: ${dataPath}`);
   let filesFound = fileOperations.readDirectoryContents(dataPath);
   console.log(`filesFound is: ${JSON.stringify(filesFound)}`);
   console.log(`END ${namespacePrefix}${functionName} function`);
   return filesFound;
 };

/**
 * @function loadAllJsonData+
 * @description Loads all the contentes of all files and folders and sub-folder at the specified path and builds a list of files to load.
 * Then loads them accordindly in the D.contextName.
 * @param {array<string>} filesToLoad The data structure containing all of the files to load data from.
 * @param {string} contextName The context name that should be used when adding data to the D-data structure.
 * @return {object} A JSON object that contains all of the data that was loaded and parsed from all the input files list.
 * @author Vlad Sorokin
 * @date 2021/10/25
 */
function loadAllJsonData(filesToLoad, contextName) {
  let functionName = loadAllJsonData.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`filesToLoad is: ${JSON.stringify(filesToLoad)}`);
  console.log(`contextName is: ${contextName}`);
  let foundSystemData = false;
  let systemConfigFileName = 'framework.system.json';
  let applicationConfigFileName = 'application.system.json';
  let multiMergedData = {};
  let parsedDataFiles = {};

  // Before we load all configuration data we need to FIRST load all the system configuration settings.
  // There will be a system configuration setting that will tell us if we need to load the debug settings or not.
  for (let i = 0; i < filesToLoad.length; i++) {
    let fileToLoad = filesToLoad[i];
    if (fileToLoad.includes(systemConfigFileName) || fileToLoad.includes(applicationConfigFileName)) {
      let dataFile = preprocessJsonFile(fileToLoad);

      // NOTE: in this case we have just loaded either the framework configuration data or the application configuration data,
      // and nothing else. So we can just assign the data to the multiMergedData.
      // We will need to merge all the other files,
      // but there will be a setting here we should examin to determine if the rest of the data should even be loaded or not.
      // We will have a new setting that determines if all the extra debug settings should be loaded or not.
      // This way the application perfomance can be seriously optimized to greater levels of lean perfomance.
      // Adding all that extra debugging configuration setting can offect load times,
      // and application perfomance to a much lesser degree.
      multiMergedData['system'] = {};
      multiMergedData['system'] = dataFile;
      foundSystemData = true;
    }
    if (foundSystemData) { break; }
  }

  // Now we need to determine if we should load the rest of the data.
  if (multiMergedData['system']['system.enableDebugConfigurationSettings']) {
    if (multiMergedData['system']['system.enableDebugConfigurationSettings'] === true ||
    multiMergedData['system']['system.enableDebugConfigurationSettings'].toUpperCase() === 'TRUE') {
      for (let j = 0; j < filesToLoad.length; j++) {
        let fileToLoad = filesToLoad[j];
        if (!fileToLoad.includes(systemConfigFileName) && !fileToLoad.includes(applicationConfigFileName) &&
        fileToLoad.toUpperCase().includes('.JSON')) {
          let dataFile = preprocessJsonFile(fileToLoad);

          if (!multiMergedData['debugSettings']) {
            multiMergedData['debugSettings'] = {};
            multiMergedData['debugSettings'] = dataFile;
          } else {
            Object.assign(multiMergedData['debugSettings'], dataFile);
          }
        } // If-condition: fileToLoad.toUpperCase().includes('.JSON')
      } // for-loop: let j = 0; j < filesToLoad.length; j++
    } // If-condition:  === true || .toUpperCase() === 'TRUE'
  }  // If-condition: if (multiMergedData['system']['system.enableDebugConfigurationSettings']
  parsedDataFiles = multiMergedData;
  console.log(`parsedDataFiles is: ${JSON.stringify(parsedDataFiles)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return parsedDataFiles;
};

/**
 * @function preprocessJsonFile
 * @description Load all of the data from a single JSON data file.
 * @param {string} filesToLoad The fully qualified path to the file that should be loaded.
 * @return {object} The JSON data object that was loaded from the specified JSON data file.
 * @author Vlad Sorokin
 * @date 2021/10/21
 */
function preprocessJsonFile(fileToLoad) {
  let functionName = preprocessJsonFile.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`fileToLoad is: ${fileToLoad}`);
  let dataFile = fileOperations.getJsonData(fileToLoad);
  console.log(`dataFile is: ${JSON.stringify(dataFile)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return dataFile;
};

module.exports = {
  ['scanDataPath']: (dataPath) => scanDataPath(dataPath),
  ['loadAllJsonData']: (filesToLoad, contextName) => loadAllJsonData(filesToLoad, contextName)
};
