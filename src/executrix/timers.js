/**
 * @file timers.js
 * @module timers
 * @description Contains all of the functions needed for generating time stamps,
 * reformatting time stamps and tracking time durations.
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @requires {@link https://www.npmjs.com/package/moment|moment}
 * @author Vlad Sorokin
 * @date 2021/11/10
 * @copyright Copyright © 2021-… by Vlad Sorokin. All rights reserved
 */

var path = require('path');
var moment = require('moment');
var baseFileName = path.basename(module.filename, path.extname(module.filename));
var namespacePrefix = `executrix.${baseFileName}.`;

/**
 * @function getNowMoment
 * @description Returns a time stamp string formatting according to the input formatting string.
 * @param {string} formating The formatting string, that tells moment in what format to
 * return the value for the day, months, year, hour, minute, second, millisecond.
 * @return {string} A time stamp string that has been formatted according to the input format.
 * @author Vlad Sorokin
 * @date 2021/11/10
 */
function getNowMoment(formatting) {
  let functionName = getNowMoment.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`formatting is: ${formatting}`);
  let returnData = '';
  returnData = moment().format(formating);
  console.log(`returnData is: ${returnData}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnData;
};

/**
 * @function computeDeltaTime
 * @description Computes the time difference between two difference data-time stamps in milliseconds
 * @param {string} startTime The start of the time period that should be computed.
 * @param {string} endTime The end of the time period that should be computed.
 * @return {integer} The difference between the beginning time and the ending time in milliseconds.
 * @author Vlad Sorokin
 * @date 2021/11/10
 */
function computeDeltaTime(startTime, endTime) {
  let functionName = computeDeltaTime.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`startTime is: ${startTime}`);
  console.log(`endTime is: ${endTime}`);
  let deltaTimeResult;
  startTime = moment(startTime, 'YYYYMMDD_HHmmss_SSS');
  endTime = moment(endTime, 'YYYYMMDD_HHmmss_SSS');
  deltaTimeResult = endTime.diff(startTime); // Should work in milliseconds out of the box!
  console.log(`deltaTimeResult is: ${deltaTimeResult}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return deltaTimeResult;
};

module.exports = {
  ['getNowMoment']: (formatting) => getNowMoment(formatting),
  ['computeDeltaTime']: (startTime, endTime) => computeDeltaTime(startTime, endTime)
};
