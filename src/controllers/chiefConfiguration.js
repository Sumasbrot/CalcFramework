/**
 * @file chiefConfiguration.js
 * @module chiefConfiguration
 * @description Contains all the functions to manage the configuration system,
 * such as adding, setup, parsing & processing.
 * @requires module:configurator
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Vlad Sorokin
 * @date 2021/10/19
 * @copyright Copyright © 2021-… by Vlad Sorokin. All rights reserved
 */

 var chiefData = require('./chiefData');
 var configurator =  require('../executrix/configurator');
 var D = require('../structures/data');
 var path = require('path');
 var baseFileName = path.basename(module.filename, path.extname(module.filename));
 var namespacePrefix = `controllers.${baseFileName}.`;

/**
 * @function setupConfiguration
 * @description Sets up all of the application and framework configuration data.
 * @param {string} appConfigPath The path of the configuration files for the application layer.
 * @param {string} frameworkConfigPath The path of the configuration files for the framework layer
 * @return {void}
 * @author Vlad Sorokin
 * @date 2021/10/19
 */
function setupConfiguration(appConfigPath, frameworkConfigPath) {
  let functionName = setupConfiguration.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`appConfigPath is: ${appConfigPath}`);
  console.log(`frameworkConfigPath is: ${JSON.stringify(frameworkConfigPath)}`);
  configurator.setConfigurationSetting('system', 'appConfigPath', appConfigPath);
  configurator.setConfigurationSetting('system', 'frameworkConfigPath', frameworkConfigPath);
  let allAppConfigData = {};
  let allFrameworkConfigData = {};
  allAppConfigData = chiefData.setupAllJsonConfigData('appConfigPath', 'configuration');
  allFrameworkConfigData = chiefData.setupAllJsonConfigData('frameworkConfigPath', 'configuration');
  // TODO: parseLoadedConfigurationData
  // TODO: merge App Config Data & Framework Config D
  console.log(`allFrameworkConfigData is: ${JSON.stringify(allFrameworkConfigData)}`);
  console.log(`allAppConfigData is: ${JSON.stringify(allAppConfigData)}`);
  console.log('ALL DATA IS: ' + JSON.stringify(D));
  console.log(`END ${namespacePrefix}${functionName} function`);
};

module.exports = {
  ['setupConfiguration']: (appConfigPath, frameworkConfigPath) => setupConfiguration(appConfigPath, frameworkConfigPath)
};
