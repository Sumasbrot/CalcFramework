#!/usr/bin/env node

/**
 * @file application.js
 * @module application
 * @description This is the main init for the calculator2 application.
 * It contains the main program loop and/or basic argument parsing.
 * Of course most of the detailed work is handed off to the application framework.
 * @requires module:main
 * @requires {@link https://www.npmjs.com/package/prompt-sync|prompt-sync}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Vlad Sorokin
 * @date 2021/10/27
 * @copyright Copyright © 2020-… by Vlad Sorokin. All rights reserved
 */

import calcFramework from '../src/main.js';
const prompt = require('prompt-sync')();
var path = require('path');
global.appRoot = path.resolve(process.cwd());
var rootPath = '';
var baseFileName = path.basename(module.filename, path.extname(module.filename));
var namespacePrefix = `${baseFileName}.`;

/**
 * @function bootstrapApplication
 * @description Setup all application data and configuration settings.
 * @return {void}
 * @author Vlad Sorokin
 * @date 2021/10/07
 */
function bootstrapApplication() {
  rootPath = path.resolve(process.cwd());
  let appConfig = {
    "applicationName": "CalcFramework",
    "rootPath": rootPath,
    "appConfigReferencePath": "//test//resources//configuration//"
  };
  calcFramework.initFramework(appConfig);
};

// function factorial(number) {
//   let functionName = factorial.name;
//   console.log(`BEGIN ${namespacePrefix}${functionName} function`);
//   console.log(`number is: ${number}`);
//   let returnData;
//   if (number === 0) {
//     returnData = 1;
//   } else {
//     returnData = number * factorial(number - 1);
//   }
//   console.log(`returnData is: ${returnData}`);
//   console.log(`END ${namespacePrefix}${functionName} function`);
//   return returnData;
// };
// console.log(`factorial result of 20 is: ${factorial(20)}`);

/**
 * @function application
 * @description This is the main program loop, the init for the entire application.
 * @return {[void]}
 * @author Vlad Sorokin
 * @date 2021/10/07
 */
function application() {
  let functionName = application.name;
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  let argumentDrivenInterface = false;
  let commandInput;
  let commandResult;

  if (argumentDrivenInterface === false) {
    console.log('BEGIN main program loop');
    console.log('BEGIN command parser');

    while(programRunning === true) {
      commandInput = prompt('>');

      if ((commandInput.toUpperCase() === 'EXIT') ||
      (commandInput.toUpperCase() === 'Q') ||
      (commandInput.toUpperCase() === 'QUIT') ||
      (commandInput.toUpperCase() === 'X')) {
        console.log('END command parser');
        programRunning = false;
        console.log('END main progdam loop');
        console.log('Exiting, Good bye, Have a nice day & stay safel');
        break;
      }
    }
  }
  console.log(`END ${namespacePrefix}${functionName} function`);
};

//Launch the application!
let programRunning = false;
bootstrapApplication();
programRunning = true;
application();
