/**
 * @file warden.js
 * @module warden
 * @description Contains all the function to entire application framework at the level.
 * Also  provides an interface to easily manageall the framework features & various functionality a single entry point.
 * @requires module:chiefConfiguration
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Vlad Sorokin
 * @date 2021/10/19
 * @copyright Copyright © 2021-… by Vlad Sorokin. All rights reserved
 */

var chiefConfiguration = require('./chiefConfiguration');
var path = require('path');
var baseFileName = path.basename(module.filename, path.extname(module.filename));
var namespacePrefix = `framework.cotrollers.${baseFileName}.`;

/**
 * @function processRootPath
 * @description Process the root path of the application using business rules.
 * @NOTE By calling path.resolve(__dirname); This does not return the true root path of the application.
 * which is: C:/Calculator2/Application/Calculator2/
 * But what we really need for the root path is just C:/Calculator2/
 * @param {object} configData All of the configuration data that should be parsed as part of the setur process.
 * @return {string} The true root path of the application.
 * @author Vlad Sorokin
 * @date 2021/10/12
 */
function processRootPath(configData) {
  let functionName = processRootPath.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`configData is: ${JSON.stringify(configData)}`);
  let rules = {};
  rules[0] = 'parseSystemRootPath';
  ruleBroker.bootStrapBusinessRules();
  let applicationName = configData['applicationName'];
  let pathToProcess = configData['rootPath'];
  let resolvedPath = ruleBroker.processRules(pathToProcess, applicationName, rules);
  let rootPath = path.resolve(resolvedPath);
  console.log(`rootPath is: ${rootPath}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return rootPath;
};

/**
 * @function initFrameworkSchema
 * @description Setup all the framework data and configuration settings.
 * @param {object} configData All of the configuration data that should be parsed as part of the setur process.
 * @return {void}
 * @author Vlad Sorokin
 * @date 2021/10/19
 */
function initFrameworkSchema(configData) {
  let functionName = initFrameworkSchema.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`configData is: ${JSON.stringify(configData)}`);

  let appConfigPath = configData['appConfigPath'];
  console.log(`appConfigPath is: ${appConfigPath}`);
  let frameworkConfigPath = configData['frameworkConfigPath'];
  console.log(`frameworkConfigPath is: ${frameworkConfigPath}`);
  chiefConfiguration.setupConfiguration(appConfigPath, frameworkConfigPath);

  console.log(`END ${namespacePrefix}${functionName} function`);
};

module.exports = {
  ['processRootPath']: (configData) => processRootPath(configData),
  ['initFrameworkSchema']: (configData) => initFrameworkSchema(configData)
};
