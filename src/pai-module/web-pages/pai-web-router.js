/**
 * PAI-WEB-ROUTER  enables http endpoints
 * @class PAI_WEB_ROUTER
 * @author captain-crypto
 * @since 9/25/2019
 * @Copyright PAI-TECH 2018, all right reserved
  */




const { PAICodeCommand, PAICodeCommandContext, PAICodeModule, PAICode, PAIModuleConfigParam, PAIModuleConfig, PAILogger, PAIModuleCommandSchema, PAIModuleCommandParamSchema } = require('@pai-tech/pai-code');


const pai_utils = require('@pai-tech/pai-code').PAIUtils;

const path = require('path');

const express = require('express')
const fs = require('fs');
const pai_code_interface = require("../pai-code-interface");




//const PAIWebBuilder = require('../packages/pai-ui/pai-web-builder/pai-html-builder');

const spell_server = require('../packages/spell/spell-server');

class PAI_WEB_ROUTER
{
    constructor() {

        
    }


    /**
     * Get file from static folder and send back to the client (Http response)
     * @param req - Http Request
     * @param res = Http Response
     * @param folder - the static folder name
     * @param route - the route including file name
     */
    get_static_folder(req, res,folder,route)
    {

        let path2 = path.resolve(__dirname,"../" + folder);
        res.sendFile(path2 + "/" + route);
    }


    /**
     * Get Home Page from PAI-UI builder send back to the client (Http response)
     * @param req - Http Request
     * @param res = Http Response
     * @param route - the route including file name
     */
    get_home(req, res,route)
    {
            
        let data_to_client = {}
        if(pai_code_interface["pai-entities"] && pai_code_interface["pai-entities"]["define"]) {
            data_to_client["pai-entities"] = pai_code_interface["pai-entities"]["define"];
        }
        let page = spell_server.get_spell_html_page("spell-page.html",data_to_client)
        res.send(page);
    }


    /**
     * Update pai-code-intercafe file
     */
    upci(req,res,route) {
        console.log(req.body["entity"])
        res.send("ok")
    }

    /**
     * Get Admin page
     * @param req - Http Request
     * @param res - Http Response
     * @param route - the route including file name
     */
    get_admin_page(req, res,route)
    {

        let route_ep = "/admin/:id/:name";
        let has_params = route_ep.indexOf("/",1);
        let params_str = "no params found"
        if(has_params < route_ep.length) {
            params_str = route_ep.substr(has_params + 1);
            let params = params_str.split("/");
            for(let idx=0;idx<params.length;++idx)
            {
                console.log(params[idx]);
            };

        }


        res.send("params are " +  params_str);
    }

}

module.exports = PAI_WEB_ROUTER;
