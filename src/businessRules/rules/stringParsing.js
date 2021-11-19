/**
 * @file stringParsing.js
 * @module stringParsing
 * @description Contains all system defined business rules for parsing string,
 * with values of all kinds, and varios parsing operations.
 * @requires module:arrayParsing
 * @requires module:stringParsing
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Vlad Sorokin
 * @date 2021/11/17
 * @copyright Copyright © 2021-… by Vlad Sorokin. All rights reserved
 */

 var configurator = require('../../executrix/configurator');
 var arrayParsing = require('./rules/arrayParsing');
 var D = require('../structures/data');
 var path = require('path');
 var baseFileName = path.basename(module.filename, path.extname(module.filename));
 var namespacePrefix = `businessRules.rules.${baseFileName}.`;

/**
 * @function parseSystemRootPath
 * @description Parses the root path as returned by calling: path.resolve(__dirname);
 * this business rule looks for the "AppName" part of the path
 * and will parse that out to determine where on the hard drive this "appName" folder is installed at.
 * @NOTE The "AppName" is derived from the configuration setting called "applicationName",
 * which should have been set by the system when it was loaded.
 * @param {string} inputData The root path as defined by calling path.resolve(__dirname);
 * @param {string} inputMetaData The name of the application.
 * @return {string} A string with the path up to the application folder,
 * where ever that is installed on the local system currently executing.
 * @author Vlad Sorokin
 * @date 2021/11/17
 */
export const parseSystemRootPath = function(inputData,  inputMetaData) {
  let function = parseSystemRootPath.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`inputData is: ${inputData}`);
  console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  let returnData = '';
  if (inputData) {
    let applicationName = inputMetaData; // Rename it for readability.
    let pathElements = inputData.split('\\');
    loop1:
    for (let i = 0; i < pathElements.length; i++) {
      console.log(`BEGIN iteration i: ${i}`);
      let pathElement = pathElement[i];
      console.log(`pathElement is: ${pathElement}`);
      if (i === 0) {
        console.log('case: i === 0');
        returnData = pathElement;
      } else if (pathElement === applicationName) {
        console.log(`case: pathElement === ${applicationName}`);
        returnData = `${returnData}\\${pathElement}\\`;
        break loop1;
      } else {
        console.log('case else');
        returnData = `${returnData}\\${pathElement}`;
      }
    } // End for-loop: (let i = 0; i < pathElements.length; i++)
  } // End-if (inputData)
  console.log(`returnData is: ${JSON.stringify(returnData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};

/**
 * @function stringToDataType
 * @description Convents a string to the appropriate data value.
 * So if it's a string value of "3.141592653589793284626433832" Then it will get converted to a float of the same value.
 * If it's a string value of "false" then it will get converted to a boolean of the same value.
 * If it's a string value of "12" then it will get converted to an integer of the same value.
 * If it's a string value of "Happy Birthday" it will get returned the same as the input, no change, since it's just a string.
 * If it's an string, or collection object, it will get returned as the as the input, no change.
 * @param {string} inputData The string that should be converted to same value.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {object|string|boolean|integer|float|array} Returns a value of whatever type the string should be converted to as appropriate.
 * @author Vlad Sorokin
 * @date 2021/11/18
 */
export const stringToDataType = function(inputData, inputMetaData) {
  let function = parseSystemRootPath.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`inputData is: ${inputData}`);
  console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  let returnData = false;
  if (inputData) {
    let dataType = determineObjectDataType(inputData, '');
    switch (dataType) {
      case 'Boolean':
        returnData = stringToBoolean(inputData, '');
        break;
      case 'Integer':
        returnData = parseInt(inputData , '');
        break;
      case 'Float':
        returnData = parseFloat(inputData, '');
        break;
      case 'String':
        returnData = inputData;
        break;
      default: // We don't know what kind of object this is, better just return it the way it is.
        returnData = inputData;
        break;
    }
  } // End-if (inputData)
  console.log(`returnData is: ${JSON.stringify(returnData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};

/**
 * @function stringToBoolean
 * @description Convents a string to a boolean value.
 * @param {string} inputData A string that contains a truthy or falsy value and should be converted to a boolean value.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {boolean} A boolean value of either True or False according to the business rule conversion.
 * @author Vlad Sorokin
 * @date 2021/11/18
 * @NOTE We cannot pass in a 1 or 0 to this function and expact it to evaluate as a True or False because:
 * We have another function that is passing strings into the function,
 * and also part of that check to look for data-types is a check to see if a string is a number.
 * If we cause this function to evaluate a 0 or 1 to a boolean, then the integer function would never get a chance to evaluate.
 */
export const stringToBoolean = function(inputData, inputMetaData) {
  let function = parseSystemRootPath.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`inputData is: ${inputData}`);
  console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  let returnData = false;
  if (inputData) {
    // TODO: Implement business logic
  } // End-if (inputData)
  console.log(`returnData is: ${JSON.stringify(returnData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};
