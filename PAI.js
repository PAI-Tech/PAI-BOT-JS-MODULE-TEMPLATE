
/*
 Module test page

 Export module to the bot engine for debugging purposes

 Author       : Tamir Fridman
 Date Created : 9/25/2019
 Copyright PAI-TECH 2018, all right reserved

 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */



const {PAILogger, PAICode } = require('@pai-tech/pai-code');
const { Module } = require('./index');



async function start(){

    let module = new Module();

    if(PAICode.modules["pai-bot"])
        await PAICode.modules["pai-bot"].applyBotDataSource(module);


    await module.registerModule(); // register the module to PAICode

    let pai_code_module_name = require("./src/pai-module/pai-code-interface")["pai-module-name"];

    let pai_code_command_version = pai_code_module_name + " version";
    let res = await PAICode.run(pai_code_command_version);
    PAILogger.info(pai_code_module_name + " v:" + res);

    PAICode.start();
}

start().then().catch(e => {
    console.log("Error " + e);
});





