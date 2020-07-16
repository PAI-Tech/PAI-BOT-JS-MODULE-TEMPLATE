
/*

 PAI-WEB-ROUTER  enables http endpoints

 Author       : Tamir Fridman
 Date Created : 9/25/2019
 Copyright PAI-TECH 2018, all right reserved

 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */




const { PAICodeCommand, PAICodeCommandContext, PAICodeModule, PAICode, PAIModuleConfigParam, PAIModuleConfig, PAILogger, PAIModuleCommandSchema, PAIModuleCommandParamSchema } = require('@pai-tech/pai-code');


const pai_utils = require('@pai-tech/pai-code').PAIUtils;

const path = require('path');
const fs = require('fs');




const PAIWebBuilder = require('../packages/pai-ui/pai-web-builder/pai-html-builder');

class PAI_WEB_ROUTER
{
    constructor() {

        this.web_builder = new PAIWebBuilder();
    }





    get_static_folder(req, res,folder,route)
    {

        let path2 = path.resolve(__dirname,"../" + folder);
        res.sendFile(path2 + "/" + route);
    }




    get_home(req, res,route)
    {
        let pai_page_data = require("./home-page.json");
        res.send(this.web_builder.get_page(pai_page_data));
    }


}

module.exports = PAI_WEB_ROUTER;
