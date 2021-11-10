/**
 * @file main.js
 * @module main
 * @description Contains all customer facing functiuns to are used to interface with the rest of the application framework.
 * @requires module:warden
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Vlad Sorokin
 * @date 2021/10/19
 * @copyright Copyright © 2021-… by Vlad Sorokin. All rights reserved
 */

var warden = require('./controllers/warden');
var path = require('path');
var baseFileName = path.basename(module.filename, path.extname(module.filename));
var namespacePrefix = `${baseFileName}.`;

/**
 * @function initFramework
 * @description initializes the framework systems.
 * @param {object} clientConfiguration A configuration data object that contains
 * all the data needed to bootstrap the framework for a client application.
 * @return {void}
 * @author Vlad Sorokin
 * @date 2021/10/07
 */
function initFramework(clientConfiguration) {
  let functionName = initFramework.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  console.log(`clientConfiguration is: ${JSON.stringify(clientConfiguration)}`);
  let appRootPath = warden.processRootPath(clientConfiguration);
  clientConfiguration['appRootPath'] = appRootPath;
  clientConfiguration['appConfigPath'] = appRootPath + clientConfiguration['appConfigReferencePath'];
  clientConfiguration['frameworkConfigPath'] = appRootPath + '//src//resources//configuration//';
  warden.initFrameworkSchema(clientConfiguration);
  console.log(`END ${namespacePrefix}${functionName} function`);
};

export default {
  ['initFramework']: (clientConfiguration) => initFramework(clientConfiguration)
};
