/**
 * @file fileOperations.js
 * @module fileOperations
 * @description Contains all of the functions required to do file operations
 * on a phisical/virtual hard drive and/or mounted volume.
 * Including loading files, saving files, reloading files, resaving files,
 * copying files, moving files, copying folders including copying folders recursively,
 * zipping files, and saving zip-packages as part of a deployment/release process.
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/fs|fs}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Vlad Sorokin
 * @date 2021/10/26
 * @copyright Copyright © 2021-… by Vlad Sorokin. All rights reserved
 */

var D = require ('../structures/data');
var fs = require('fs');
var path = require('path');
var filesCollection = [];
const directoriesToSkip = ['browser_componets', 'node_modules', 'www',
'platforms', 'release', 'documentation', 'recycle', 'trash'];
var enableFilesListLimit = false;
var filesListLimit = -1;
var hitFileLimit = false;
var baseFileName = path.basename(module.filename, path.extname(module.filename));
var namespacePrefix = `executrix.${baseFileName}.`;

/**
 * @function getJsonData
 * @description Loads the specified file and parses it into a JSON object(s).
 * @param {string} pathAndFilename The path and file name of the JSON file that
 * should be loaded and parsed into JSON objects.
 * @return {object} The JSON object as it was loaded from the file with minimal to no additional processing.
 * @author Vlad Sorokin
 * @date 2021/10/26
 */
function getJsonData(pathAndFilename) {
  let functionName = getJsonData.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`pathAndFilename is: ${pathAndFilename}`);
  pathAndFilename = path.resolve(pathAndFilename);
  let rawData = fs.readFileSync(pathAndFilename, { encording: 'UTF8'});
  let parsedData = JSON.parse(rawData);
  console.log(`DONE loading data from: ${pathAndFilename}`);
  console.log(`parsedData is: ${JSON.stringify(parsedData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return parsedData;
};

/**
 * @function readDirectoryContents
 * @description This function acts as a wrapper for calling readDirectorySynchronously
 * since that function is recursive. Also that function doesn't technically return anything,
 * it works with a global variable that needs to be reset after the work is done with it.
 * So these are the things that this wrapper function can do.
 * @param {string} directory The path that needs to be scanned.
 * @return {object} An object containing an array of all the folder and all sub-folders.
 * @author Vlad Sorokin
 * @date 2021/10/26
 */
function readDirectoryContents(directory) {
  let functionName = readDirectoryContents.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`directory is: ${directory}`);
  let filesFound = [];
  // Make sure to resolve the path on the local system,
  // just in case there are issues with the OS that code is running on.
  directory = path.resolve(directory);
  // readDirectorySynchronously(directory);
  filesFound = filesCollection; // Copy the data into a local variable first.
  // Make sure to clear it so we don't have a chance of it corrupting any other file operations.
  filesCollection = undefined;
  filesCollection = [];
  console.log(`filesFound is: ${JSON.stringify(filesFound)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return filesFound;
};

// TODO: Implement readDirectorySynchronously function

/**
 * @function readDirectorySynchronously
 * @description
 * @param {string} directory
 * @return {object}
 * @author Vlad Sorokin
 * @date 2021/10/27
 */
function readDirectorySynchronously(directory) {
  let functionName = readDirectorySynchronously.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`directory is: ${directory}`);

  console.log(`filesFound is: ${JSON.stringify(filesFound)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return filesFound;
};

module.exports = {
  ['getJsonData']: (pathAndFilename) => getJsonData(pathAndFilename),
  ['readDirectoryContents']: (directory) => readDirectoryContents(directory)
};
