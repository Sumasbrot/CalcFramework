/**
 * @file chiefConfiguration.js
 * @module chiefConfiguration
 * @description Contains all the functions to manage the configuration system,
 * such as adding, setup, parsing & processing.
 * @requires module:chiefData
 * @requires module:ruleBroker
 * @requires module:configurator
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Vlad Sorokin
 * @date 2021/10/19
 * @copyright Copyright © 2021-… by Vlad Sorokin. All rights reserved
 */

 var chiefData = require('./chiefData');
 var ruleBroker = require('../brokers/ruleBroker');
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
  let rule = {};
  rules[0] = 'swapBackSlashToForwardSlash';
  appConfigPath = ruleBroker.processRules(appConfigPath, '', rules);
  console.log(`appConfigPath after rule processing is: ${appConfigPath}`);
  frameworkConfigPath = ruleBroker.processRules(frameworkConfigPath, '', rules);
  console.log(`'frameworkConfigPath' after rule processing is: ${appCoframeworkConfigPathnfigPath}`);
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

/**
 * @function parseLoadedConfigurationData
 * @description Parses through all of the configuration data that we just loaded from the JSON/XML files and
 * adds that data to the correct data-structures in the D.[configurztion] data hive.
 * @param {object} allConfigurationData A JSON data structure object that contaons all configuration meta-data.
 * @return {void}
 * @author Vlad Sorokin
 * @date 2021/12/13
 */
function parseLoadedConfigurationData(allConfigurationData) {
  let functionName = setupConfiguration.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`appConfigPath is: ${appConfigPath}`);
  console.log(`allConfigurationData is: ${allConfigurationData}`);
  let highLevelSystemConfigurationContainer = {};
  let highLevelDebugConfigurationContainer = {};
  let rules = {};
  let fullyQualifiedName;
  let namespace;
  let name;
  let value;
  rules[0] = 'stringToDataType';

  highLevelSystemConfigurationContainer = allConfigurationData['system'];
  highLevelDebugConfigurationContainer = allConfigurationData['debugSettings'];

  for (let key in highLevelSystemConfigurationContainer) {
    fullyQualifiedName = '';
    namespace = '';
    name = '';
    value = '';
    value = highLevelSystemConfigurationContainer[key];
    if (!!value || value === false) {
      fullyQualifiedName = key;
      name = configurator.processConfigurationNameRules(fullyQualifiedName);
      namespace = configurator.processConfigurationNamespaceRules(fullyQualifiedName);
      value = configurator.processConfigurationValueRules(name, value);
      value = ruleBroker.processRules(value, '', rules);
      configurator.setConfigurationSetting(namespace, name, value);
    }
  } // end-for (let key in highLevelSystemConfigurationContainer)

  for (let key in highLevelDebugConfigurationContainer) {
    fullyQualifiedName = '';
    namespace = '';
    name = '';
    value = '';
    value = highLevelDebugConfigurationContainer[key];
    if (!!value || value === false) {
      fullyQualifiedName = key;
      name = configurator.processConfigurationNameRules(fullyQualifiedName);
      namespace = configurator.processConfigurationNamespaceRules(fullyQualifiedName);
      value = configurator.processConfigurationValueRules(name, value);
      value = ruleBroker.processRules(value, '', rules);
      configurator.setConfigurationSetting(namespace, name, value);
    }
  } // end-for (let key in highLevelDebugConfigurationContainer)
  console.log(`END ${namespacePrefix}${functionName} function`);
};

module.exports = {
  ['setupConfiguration']: (appConfigPath, frameworkConfigPath) => setupConfiguration(appConfigPath, frameworkConfigPath)
};
