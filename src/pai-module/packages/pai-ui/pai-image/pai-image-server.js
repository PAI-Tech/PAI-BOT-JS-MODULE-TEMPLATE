/*
 Module       : PAI-UI-KIT
 File         : pai-desktop-server
 Description  : Server side implementation
 Author       : Tamir Fridman
 Date Created : 19/11/2018
 Copyright PAI-TECH 2018, all right reserved
  */


const pai_utils = require('@pai-tech/pai-code').PAIUtils;



const PAIUIBasePackage  = require('../pai-ui-base-package');



const pai_html_writer = require("../pai-web-builder/pai-html-writer");



class PAIDesktop extends PAIUIBasePackage {


    constructor() {
        super();

        this.package_name = 'pai-ui/pai-image';
        this.package_files = [
            {"file-name": "pai-image.css", "type": "stylesheet"},
            {"file-name": "pai-image.js", "type": "script"},
        ];


    }


    parse(key,data,html_out)
    {


        let img_data = JSON.stringify(data);
        let img_data_id = "image_data_" + new Date().valueOf();
        let jsf = "let " + img_data_id + " = `" + img_data + "`;pai_image_add('pai-desktop'," + img_data_id + ");\n";
        html_out.main_func_js.push(jsf);
    }
}


module.exports = PAIDesktop;