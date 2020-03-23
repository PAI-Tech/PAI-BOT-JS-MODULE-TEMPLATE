/*
 Module       : PAI-UI-KIT
 File         : pai-ui
 Description  : Server side implementation
 Author       : Tamir Fridman
 Date Created : 19/11/2018
 Copyright PAI-TECH 2018, all right reserved
  */


//const {PAIDataSource, PAIEntity, PAIEntityList} = require('@pai-tech/pai-code');

//const pai_utils = require('@pai-tech/pai-code').PAIUtils;


const path = require('path');
const fs = require('fs');

const PAIDesktop = require("./pai-desktop/pai-desktop-server");

let instance = null;

class PAIUI {

    constructor() {
        this.package_name = 'pai-ui';

        this.packages = {
            "pai-desktop": new PAIDesktop()
        };


    }


    get_package(package_name)
    {
        let pkg_obj = null;
        if(this.packages.hasOwnProperty(package_name))
        {
            return this.packages[package_name];
        }
        else
        {
            let pkg_server_file_name = `./${package_name}/${package_name}-server`;

            if(fs.existsSync(path.resolve(__dirname,pkg_server_file_name +".js")))
            {
                let new_pai_ui_pkg = require (pkg_server_file_name);
                pkg_obj = new new_pai_ui_pkg();
                this.packages[package_name] = pkg_obj;
            }

        }
        return pkg_obj;
    }


    static get get_instance()
    {
        if(!instance)
        {
            instance = new PAIUI();
        }
        return instance;
    }


}


module.exports = PAIUI;