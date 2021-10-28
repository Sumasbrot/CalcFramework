/**
 * @file chiefData.js
 * @module chiefData
 * @description Contains all the function to manage the loading and processing of data,
 * such as XML files , CSV files or JSON files. Additional file type processing should be added in this module.
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Vlad Sorokin
 * @date 2021/10/13
 * @copyright Copyright © 2021-… by Vlad Sorokin. All rights reserved
 */

var dataBroker = require('../brokers/dataBroker');
var configurator = require('../executrix/configurator');
var path = require('path');
var baseFileName = path.basename(module.filename, path.extname(module.filename));
var namespacePrefix = `cotrollers.${baseFileName}.`;

/**
 * @function setupAllJsonConfigData
 * @description Sets up all of the JSON data at the specifed configuration path.
 * @param {string} dataPathConfigurationName The name of the configuration setting that has the path we should search.
 * @param {string} contextName The context name that should be used when adding data to the D data structure.
 * @return {object} A JSON object that contains all of the data that was loaded and merged together.
 * @author Vlad Sorokin
 * @date 2021/10/21
 */
function setupAllJsonConfigData(dataPathConfigurationName, contextName){
  let functionName = setupAllJsonConfigData.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`dataPathConfigurationName is: ${dataPathConfigurationName}`);
  console.log(`contextName is: ${contextName}`);
  let loadedAndMergedDataAllFiles = {};
  let dataPath = configurator.getConfigurationSetting(dataPathConfigurationName);
  dataPath = path.resolve(dataPath);
  let filesToLoad = dataBroker.scanDataPath(dataPath, contextName);
  loadedAndMergedDataAllFiles = dataBroker.loadAllJsonData(filesToLoad, contextName);
  console.log(`loadedAndMergedDataAllFiles is: ${JSON.stringify(loadedAndMergedDataAllFiles)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return loadedAndMergedDataAllFiles;
};

module.exports = {
  ['setupAllJsonConfigData']: (dataPathConfigurationName, contextName) => setupAllJsonConfigData(dataPathConfigurationName, contextName)
};   
