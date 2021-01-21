/**
 * <pai-bot-js-module-template>
 * Author       : Tamir Fridman
 * Date Created : 9/25/2019
 * Copyright PAI-TECH 2018, all right reserved

 * This file is the entry point of your base module.

 *      This program is free software; you can redistribute it and/or
 *        modify it under the terms of the GNU General Public License
 *        as published by the Free Software Foundation; either version
 *        3 of the License, or (at your option) any later version.
 */


const {
    PAICodeCommand,
    PAIUtils,
    PAICodeCommandContext,
    PAICodeModule,
    PAICode,
    PAIModuleConfigParam,
    PAIModuleConfig,
    PAILogger,
    PAIModuleCommandSchema,
    PAIModuleCommandParamSchema
} = require('@pai-tech/pai-code');


const path = require('path');
const fs = require('fs');
const pai_module_settings = require("@pai-tech/pai-code").PAIModuleSettings.get_instance;
const pai_code_interface = require("./pai-code-interface");
const pai_web_router = require("./web-pages/pai-web-router");
const pai_ddb = require("@pai-tech/pai-ddb").get_db(pai_code_interface["pai-module-name"]);
const pai_web_server = require("./web-pages/pai-web-server");
const pai_entity_manager = require("@pai-tech/pai-code").PAIEntityManager.get_instance;

class PCM_MAIN extends PAICodeModule {
    constructor() {

        // Module description that will be shown on info command [your-module-name info]
        let infoText = pai_code_interface["pai-module-desc"];

        super(infoText);
        this.bot_folder = null;

        this.config.schema = [
            //PAIModuleConfigParam(label, description, paramName, defaultValue)
            // TODO: add configuration parameters
        ];
        //this.web_static_folders = {};
        //this.web_services = {};
        this.pai_web_router = new pai_web_router();
        this.pai_web_server = null;
    }


    /**
     * This method runs when the module is being loaded by the bot it load basic module commands from super
     *
     * and load all the functions for this module
     */
    async load() {
        await super.load();
        await super.load_pai_code_interface(pai_code_interface);
        try {
            this.bot_folder = await PAICode.run("pai-bot get-bot-folder");
        } catch (exp) {
        }

        /**
         * init pai-ddb
         */


        if (pai_code_interface.hasOwnProperty("pai-ddb")) {

            let pai_ddb_folder = this.bot_folder + "data" + path.sep + this.get_module_name() + path.sep;
            if (pai_code_interface["pai-ddb"].hasOwnProperty("data-security")) {
                pai_ddb.ddb_data["data-security"] = pai_code_interface["pai-ddb"]["data-security"];
            }
            pai_ddb.init(pai_ddb_folder);
        }

        /**
         * init pai-web-server
         */

        if (pai_code_interface.hasOwnProperty("pai-web-server")) {

            this.pai_web_server = new pai_web_server(pai_code_interface["pai-web-server"].config);
            this.pai_web_server.start();
        }


        /**
         * add any load processes you want
         */


    }


    /**
     * Get the module name from pai-code-interface file
     * @override
     * @return {string} module name
     */
    get_module_name() {
        return pai_code_interface["pai-module-name"];
    }


    /**
     * Echo version number of your module
     * @param {PAICodeCommand} cmd
     */
    version(cmd) {
        return require("./../../package").version;
    }


    get_release_notes(cmd) {
        let pai_release_notes = fs.readFileSync(path.resolve(__dirname, "release-notes.txt"), 'utf8');
        return this.get_module_name() + ":\n--------------\n" + pai_release_notes;
    }


    /**
     * process incoming http requests from bot web interface.
     * by default it being processed in the super class by the pai-code-interface configuration
     *
     * - change this function only if you want to override pai-code-interface settings
     * @override
     * @param cmd
     * @return {*}
     */
    http_request(cmd) {
        return this.process_http_request(cmd, this.pai_web_router)
    }


    async add_sample_entity(cmd) {
        let sample_entity = pai_entity_manager.get_empty_entity("sample-entity");
        sample_entity["first-name"] = cmd.params["first-name"].value;
        sample_entity["last-name"] = cmd.params["last-name"].value;
        await pai_ddb.add_entity(sample_entity, false);
        pai_ddb.commit();
        let msg = "new sample entity created: ";
        PAILogger.info(msg);
        return msg;
    }

    async get_sample_entity(cmd) {
        let filter = JSON.parse(cmd.params["filter"].value);
        let res = pai_ddb.find("sample-entity", filter);
        let res_str = JSON.stringify(res);
        PAILogger.info(res_str);
        return res_str;
    }

    async restore_ddb(cmd) {
        try {
            const backupName = cmd.params['name'].value;
            pai_ddb.rollback(backupName);
            return 'ddb restored!';
        } catch (e) {
            return e;
        }

    }


    async backup_ddb(cmd) {
        try {
            const backupName = cmd.params['name'].value;
            pai_ddb.backup(backupName);
            return 'ddb backed!';
        } catch (e) {
            return e;
        }

    }


    async get_backups() {
        try {
            return pai_ddb.getBackups();
        } catch (e) {
            return e;
        }

    }

    async install_required_modules(cmd) {
        let context = cmd.context;
        let required_modules = pai_code_interface["required-modules"];
        try {
            await Promise.all(required_modules.map(async (module) => {
                await PAICode.executeString(`pai-bot learn module:"${module}"`, context);
            }));
            return 'All Modules Installed successfully';
        } catch (e) {
            console.log(e);
            return e;
        }
    }

}


module.exports = PCM_MAIN;
