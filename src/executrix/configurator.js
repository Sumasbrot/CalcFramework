/**
 * @file configurator.js
 * @module configurator
 * @description Contains the function necessary to set and get configuration settings from the shared data structure.
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Vlad Sorokin
 * @date 2021/10/19
 * @copyright Copyright © 2021-… by Vlad Sorokin. All rights reserved
 * @NOTE This file is needed to keep these lower level fuctions separate from the chiefConfiguration.
 * Becose having these functions in the chiefConfiguration can cause a circular dependency.
 */

 var D = require('../structures/data');
 var path = require('path');
 var baseFileName = path.basename(module.filename, path.extname(module.filename));
 var namespacePrefix = `executrix.${baseFileName}.`;

/**
 * @function setConfigurationSetting
 * @description Set a configuration setting on the configuration data structure stored on the D-data structure.
 * @param {string} configurationNamespace The path in the configuration JSON object
 * where the configuration setting should be set.
 * @param {string} configurationName The key of the configuration setting
 * @param {string|integer|boolean|double} configurationValue The value of the configuration.
 * @author Vlad Sorokin
 * @data 2021/10/13
 */
function setConfigurationSetting(configurationNamespace, configurationName, configurationValue) {
  let functionName = setConfigurationSetting.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`configurationNamespace is: ${configurationNamespace}`);
  console.log(`configurationName is: ${configurationName}`);
  console.log(`configurationValue is: ${configurationValue}`);
  let namespaceConfigObject = getConfigurationNamespaceObject(configurationNamespace.split('.'));
  if (namespaceConfigObject) {
    namespaceConfigObject[`${configurationNamespace}.${configurationName}`] = configurationValue;
  }
  console.log(`END ${namespacePrefix}${functionName} function`);
};

/**
 * @function getConfigurationSetting
 * @description Gets a configuration value based on the configuration name.
 * @param {string} configurationNamespace The path in the configuration JSON object
 * where the configuration setting should be found.
 * @param {string} configurationName The key of the configuration setting.
 * @return {string|integer|boolean|double} The value of whatever was stored in the D['configuration'].
 * @author Vlad Sorokin
 * @data 2021/10/19
 */
function getConfigurationSetting(configurationNamespace, configurationName) {
  let functionName = getConfigurationSetting.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`configurationNamespace is: ${configurationNamespace}`);
  console.log(`configurationName is: ${configurationName}`);
  let returnConfigurationValue;
  let namespaceConfigObject = undefined;
  namespaceConfigObject = getConfigurationNamespaceObject(configurationNamespace.split('.'));
  if (namespaceConfigObject) {
    if (configurationName) {
      if (configurationName.includes('@') && configurationName.indexOf('@') === 0) {
        returnConfigurationValue = getParentConfigurationNamespaceObject(configurationNamespace, configurationName);
      } else {
        returnConfigurationValue = namespaceConfigObject[`${configurationNamespace}.${configurationName}`];
      }
    } else {
      returnConfigurationValue = getConfigurationNamespaceObject(configurationNamespace, '');
    }
  }
  console.log(`returnConfigurationValue is: ${returnConfigurationValue}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnConfigurationValue;
};

/**
 * @function processConfigurationNameRules
 * @description Process a fully qualified name and extracts the configuration name without the namespace.
 * @param {string} fullyQualifiedName The fully qualified name with the namespace included.
 * @return {string} The name of the configuration setting without the namespace.
 * @author Vlad Sorokin
 * @date 2021/11/10
 * @NOTE Cannot use the loggers here, because of a circular dependency.
 */
function processConfigurationNameRules(fullyQualifiedName) {
  let functionName = getConfigurationSetting.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`fullyQualifiedName is: ${fullyQualifiedName}`);
  let returnValue;
  let fullyQualifiedNameArray = fullyQualifiedName.split('.');
  returnValue = fullyQualifiedNameArray[fullyQualifiedNameArray.length - 1];
  console.log(`returnValue is: ${returnValue}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnValue;
};

/**
 * @function processConfigurationNamespaceRules
 * @description Process a fully qualified name and extracts the name space.
 * @param {string} fullyQualifiedName The fully qualified name with the namespace included.
 * @return {string} The namespace of the configuration setting, without the configuration name.
 * @author Vlad Sorokin
 * @date 2021/11/10
 * @NOTE Cannot use the loggers here, because of a circular dependency.
 */
function processConfigurationNamespaceRules(fullyQualifiedName) {
  let functionName = processConfigurationNamespaceRules.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`fullyQualifiedName is: ${fullyQualifiedName}`);
  let returnValue;
  returnValue = fullyQualifiedName.substr(0, fullyQualifiedName.lastIndexOf('.'));
  if (returnValue.includes('debugFunctions') || returnData.includes('debugFiles')) {
    // We need to strip off the "debugFunctions" & "debugFiles" prefixes along with the pipe that delimits them.
    // At some point we might need these separate designations, like for the colorized logic, but for now,
    // until there is a business need I will keep them unifined.
    // Everything to the right all falls under the designation of "debugSettings"
    // so that as the base for the namespace tree should work perfectly.
    let parsedDebugSettingsNamespace = returnValue.split('.');
    returnValue = parsedDebugSettingsNamespace[1];
  }
  console.log(`returnValue is: ${returnValue}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnValue;
};

/**
 * @function processConfigurationValueRules
 * @description Processes a name and value to execute reqired code and convrert string values
 * to actial data objects needed by the configuration system.
 * @param {string} name The name of the configuration vriable, without the namespace.
 * @param {string} value The value of the configuration variable.
 * @return {string|boolean|integer|float|object} A value that is appropiately processed.
 * @author Vlad Sorokin
 * @date 2021/11/11
 * @NOTE Cannot use the loggers here, because of a circular dependency.
 */
function processConfigurationValueRules(name, value) {
  let functionName = processConfigurationValueRules.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`name is: ${name}`);
  console.log(`value is: ${value}`);
  let returnValue;
  switch (name) {
    case 'dateTimeStamp' : case 'dateStamp': case 'timeStamp':
      // NOTE: All of these three configuration are processed exactly the same way.
      // As long as what is stored in the configuration file is correct, then they should be processed correctly here.
      returnValue = timers.getNowMoment(value);
      break;
    default: // We don't know what the value is.
      // We have to just return the value as it was passed in, no processing.
      // We don't want to corrupt the other data that may be passed into this function.
      returnValue = value;
  }
  console.log(`returnValue is: ${returnValue}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnValue;
};

/**
 * @function getParentConfigurationNamespaceObject
 * @description Navigates the configuration JSON data tree to find the namespace of the configuration setting,
 * and then determines the parent and returns the entire tree of the configuration data
 * including that parent and all it's top level contents.
 * @param {string} configurationNamespace The fully qualified path in the configuration JSON object
 * where the configuration setting should be found.
 * @param {string} optionalFunctionNameAppendix An optional function name appendix that could
 * potentionally be added to the end of the function name.
 * Ex: @ModuleFontBackgroundColor
 * @return {object|boolean} The parent of the object found at the specified namespace address in the configuration data object,
 * or False if nothing was found.
 * @author Vlad Sorokin
 * @date 2021/11/11
 * @NOTE Cannot use the loggers here, because of a circular dependency.
 */
function getParentConfigurationNamespaceObject(configurationNamespace, optionalFunctionNameAppendix = '') {
  let functionName = getParentConfigurationNamespaceObject.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`configurationNamespace is: ${configurationNamespace}`);
  console.log(`optionalFunctionNameAppendix is: ${optionalFunctionNameAppendix}`);
  let returnValue;
  returnValue = true;
  let parentConfigurationNamespaceArray = configurationNamespace.split('.');
  let newParentConfigurationName = parentConfigurationNamespaceArray.pop();
  let newParentConfigurationNamespace = parentConfigurationNamespaceArray.join('.');
  let parentNamespaceConfigObject = getConfigurationNamespaceObject(parentConfigurationNamespaceArray);
  if (optionalFunctionNameAppendix !== '') {
    returnValue = parentNamespaceConfigObject[`${newParentConfigurationNamespace}.${newParentConfigurationName}${optionalFunctionNameAppendix}`];
  } else {
    returnValue = parentNamespaceConfigObject[`${newParentConfigurationNamespace}.${newParentConfigurationName}`];
  }
  console.log(`returnValue is: ${returnValue}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnValue;
};

/**
 * @function getConfigurationNamespaceObject
 * @description Navigates the configuration JSON data object tree to find the namespace of configuration settings.
 * @param {string} configurationNamespace The path in the configuration JSON object where the
 * configuration setting should be set, or returned.
 * @return {[type]} The object found at the specified namespace address in the configuration data object,
 * or False if nothing was found.
 * @author Vald Sorokin
 * @date 2021/11/11
 * @NOTE Cannot use the loggers here, because of a circular dependency.
 */
function getConfigurationNamespaceObject(configurationNamespace) {
  let functionName = getConfigurationNamespaceObject.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`configurationNamespace is: ${configurationNamespace}`);
  let returnValue;
  let returnValue = true; //Assume there will be a return value.
  let configurationDataRoot = D['configuration'];
  let configurationPathObject = configurationDataRoot
  // Need to handle the case that the configuration data object doesn't even exist at all!
  if (!configurationPathObject) {
    D['configuration'] = {};
    configurationDataRoot = D['configuration'] = {};
    configurationPathObject = configurationDataRoot;
  }
  for (let i = 0; i < configurationNamespace.length; i++) {
    if (!configurationPathObject[configurationNamespace[i]]){
      // It doesn't exist yet, so lets make it.
      configurationPathObject[configurationNamespace[i]] = {};
    }
    configurationPathObject = configurationPathObject[configurationNamespace[i]];
  } // End for-loop let i = 0; i < configurationNamespace.length; i++
  if (returnValue) {
    returnValue = configurationPathObject;
  }
  console.log(`returnValue is: ${returnValue}`);
  console.log(`END ${namespacePrefix}${functionName} function`);
  return returnValue;
};

module.exports = {
  ['setConfigurationSetting']: (configurationNamespace, configurationName, configurationValue) =>
    setConfigurationSetting(configurationNamespace, configurationName, configurationValue),
  ['getConfigurationSetting']: (configurationNamespace, configurationName) =>
    getConfigurationSetting(configurationNamespace, configurationName),
  ['processConfigurationNameRules']: (fullyQualifiedName) =>
    processConfigurationNameRules(fullyQualifiedName),
  ['processConfigurationNamespaceRules']: (fullyQualifiedName) =>
    processConfigurationNamespaceRules(fullyQualifiedName),
  ['processConfigurationValueRules']: (name, value) =>
    processConfigurationValueRules(name, value)
};
