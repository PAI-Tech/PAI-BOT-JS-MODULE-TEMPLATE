/*
 Module       : PAI-UI-KIT
 File         : pai-window-server
 Description  : Server side implementation
 Author       : Tamir Fridman
 Date Created : 19/11/2018
 Copyright PAI-TECH 2018, all right reserved
  */


const pai_utils = require('@pai-tech/pai-code').PAIUtils;



const PAIUIBasePackage  = require('../pai-ui-base-package');



const pai_html_writer = require("../pai-web-builder/pai-html-writer");



class PAIWindow extends PAIUIBasePackage {


    constructor() {
        super();

        this.package_name = 'pai-ui/pai-window';
        this.package_files = [
            {"file-name": "pai-window.css", "type": "stylesheet"},
            {"file-name": "pai-window.js", "type": "script"},
        ];


    }


    parse(key,data,html_out)
    {
        let i_data = JSON.stringify(data);
        let i_data_id = "i_data_" + new Date().valueOf();
        let jsf = "let " + i_data_id + " = `" + i_data + "`;pai_window_add('pai-desktop'," + i_data_id + ");\n";
        html_out.main_func_js.push(jsf);
    }
}


module.exports = PAIWindow;