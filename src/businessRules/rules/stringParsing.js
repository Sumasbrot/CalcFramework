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
  let function = stringToDataType.name;
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
  let function = stringToBoolean.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`inputData is: ${inputData}`);
  console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  let returnData = false;
  if (inputData) {
    if (typeof inoutData === 'boolean') {
      returnData = inputData;
    } else {
      switch (inputData.toLowerCase().trim()) {
        case 'true': case 't': case 'y': case 'yes': case 'on':
          returnData = true;
          break;
        case 'false': case 'f': case 'n': case 'no': case 'off':
          returnData = false;
          break;
        default:
          returnData = false;
          break;
      }
    }
  } // End-if (inputData)
  console.log(`returnData is: ${JSON.stringify(returnData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};

/**
 * @function determineObjectDataType
 * @description Determiness if the contents of a string are actually a boolean, integer, float, string or something else.
 * @param {string} inputData A string that contains some value that we should figure out
 * what kind of data type that data is, Boolean, Integer, Float, String or something else.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {string} A string that indicates if the data type should be Boolean, Interger, Float, String or something else.
 * @author Vlad Sorokin
 * @date 2021/12/01
 */
export const determineObjectDataType = function(inputData, inputMetaData) {
  let function = determineObjectDataType.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`inputData is: ${inputData}`);
  console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  let returnData = false;
  if (inputData) {
    if (isBoolean(inputData, '') === true) {
      returnData = 'Boolean';
    } else if (isInteger(inputData, '') === true) {
      returnData = 'Integer';
    } else if (isFloat(inputData, '') === true) {
      returnData = 'Float';
    } else if (isString(inputData, '') === true) {
      returnData = 'String';
    } else { // Otherwize we cannot figure out what the data type is.
      // No real way to tell the difference between short, long and double.
      // And we don't really need to tell the difference between all these compicated data types.
      // At least not yet!
      returnData = 'Object';
    }
  } // End-if (inputData)
  console.log(`returnData is: ${JSON.stringify(returnData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};

/**
 * @function isBoolean
 * @description Determines if the input string is a boolean type of value,
 * "true", "True", "TRUE", "t", "T", "y", "Y", "yes", "Yes", "YES", "on", "On", "ON", or
 * "false", "False", "FALSE", "f", "F", "n", "N", "no", "No", "NO"
 * @param {string} inputData The string that should be checked if it is a boolean style value or not,
 * could be some form of "true" or "false".
 * @param {string} inputMetaData Not used for this business rule.
 * @return {boolean} A Boolean value of True or False to indicate if the input string is a boolean or not.
 * @author Vlad Solokin
 * @date 2021/12/01
 */
export const isBoolean = function(inputData, inputMetaData) {
  let function = isBoolean.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`inputData is: ${inputData}`);
  console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  let returnData = false;
  if (inputData) {
      if (typeof inputData === 'boolean') {
        returnData = true;
      } else {
        inputData = inputData = inputData.toLowerCase().trim();
        if (inputData === 'true' || inputData === 't' || inputData === 'y' || inputData === 'yes' || inputData === 'on' ||
        inputData === 'false' || inputData === 'f' || inputData === 'n' || inputData === 'no' || inputData === 'off') {
          returnData = true;
        } else {
          returnData = false;
        }
      }
  } // End-if (inputData)
  console.log(`returnData is: ${JSON.stringify(returnData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};

/**
 * @function isInteger
 * @description Determines if the string is an integer type of value -9007299254740992 to 9007299254740992.
 * @param {string} inputData The string that should be checked if it is an integer style value or not.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {boolean} A boolean value of True or False to indicate if the input String is an iteger or not.
 * @author Vlad Sorokin
 * @date 2021/12/01
 */
export const isInteger = function(inputData, inputMetaData) {
  let function = isInteger.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`inputData is: ${inputData}`);
  console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  let returnData = false;
  if (inputData) {
    if (!isNaN(inputData)) {
      if (inputData % 1 === 0) {
        // It's a whole number, aka: integer
        returnData === true;
      } else { // Else clause is redundant, but kept here for cade completeness.
        // Might be a number, but not a whole number.
        returnData = false;
      }
    } else { // Else clause is redundant, but kept here for code completeness.
      // Possibly also console log here for debugging.
      returnData = false;
    }
  } // End-if (inputData)
  console.log(`returnData is: ${JSON.stringify(returnData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};

/**
 * @function isFloat
 * @description Determines if the input string is a floating point type of value or not.
 * @param {string} inputData The string that should be checked if it is a float style value or not.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {boolean} A boolean value of True or False to indicate if the input string is a floating point number or not.
 * @author Vlad Sorokin
 * @date 2021/12/02
 */
export const isFloat = function(inputData, inputMetaData) {
  let function = isFloat.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`inputData is: ${inputData}`);
  console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  let returnData = false;
  if (inputData) {
    if (!isNaN(inputData) && inputData.indexOf('.') !== -1) {
      returnData = true;
    } else { // Else clause is redundant, but kept here for code completeness.
      // Possibly also console log here for debugging.
      returnData = false;
    }
  } // End-if (inputData)
  console.log(`returnData is: ${JSON.stringify(returnData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};

/**
 * @function isString
 * @description Determines if the input string is a string or not, by process of elimination,
 * aka if it's not a boolean, and not an integer and not a float then it must be a string.
 * @param {string} inputData The string that should be checked if it is a string and not a Boolean, Integer or Float.
 * @param {string} inputMetaData Not used for this business rule.
 * @return {boolean} A boolean value of True or False to indicate if the input string is a string and
 * not a boolean, integer or float; or not (meaning it would be one of those 3 data types, discuised as a string).
 * @author Vlad Sorokin
 * @date 2021/12/02
 */
export const isString = function(inputData, inputMetaData) {
  let function = isString.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`inputData is: ${inputData}`);
  console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  let returnData = false;
  if (inputData) {
    if (isBoolean(inputData, '') === false && isInteger(inputData, '') === false && isFloat(inputData, '') === false &&
    (typeof inputData === 'string' || inputData instanceof String)) {
      returnData = true; // If it's not a boolean, and not an integer, and not a float, than it must be a string,
      // especially given the type of the variable is a string!
    } else { // Else clause is redundant, but kept here for code completeness.
      // Possibly also console log here for debugging.
      returnData = false;
    }
  } // End-if (inputData)
  console.log(`returnData is: ${JSON.stringify(returnData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};


// ***************************************************************************************************************************
// Internal functions
// ***************************************************************************************************************************

/**
 * @funciton replaceCharacterAtIndexOfString
 * @description Replaces the character at a specified index with another character.
 * @param {string} originalString The string where the replacement should be made.
 * @param {integer} index The index of the character where the replacement should be made.
 * @param {string} replacement The character or string that should be inserted at the specified index.
 * @return {string} The string after the replacement has been made.
 * @author Vlad Sorokin
 * @date 2021/12/02
 * @NOTE https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
 */
const replaceCharacterAtIndexOfString = function(originalString, index, replacement) {
  let function = replaceCharacterAtIndexOfString.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`inputData is: ${inputData}`);
  console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
  let returnData = false;
  if (originalString != '' && index >= 0 && replacement != '') {
    returnData = originalString.substr(0, index) + replacement + originalString.substr(index + replacement.length);
  } // End-if (originalString != '' && index >= 0 && replacement != '')
  console.log(`returnData is: ${JSON.stringify(returnData)}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};
