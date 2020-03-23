/*
 Module       : PAI-UI-KIT
 File         : NEW PAGE TEMPLATE PAGE
 Description  : Server side implementation
 Author       : Tamir Fridman
 Date Created : 19/11/2018
 Copyright PAI-TECH 2018, all right reserved
  */


const pai_utils = require('@pai-tech/pai-code').PAIUtils;



const PAIUIBasePackage  = require('../pai-ui-base-package');



const pai_html_writer = require("../pai-web-builder/pai-html-writer");



class PAIHomePage extends PAIUIBasePackage {


    constructor() {
        super();

        this.package_name = 'pai-ui/pai-home-page';
        this.package_files = [
            {"file-name": "pai-home-page.css", "type": "stylesheet"},
            {"file-name": "pai-home-page.js", "type": "script"},
        ];


    }


    parse(key,data,html_out)
    {

        let i_data = JSON.stringify(data);
        let i_data_id = "i_data_" + new Date().valueOf();
        let jsf = "let " + i_data_id + " = `" + i_data + "`;pai_home_page_get('pai-desktop'," + i_data_id + ");\n";

        html_out.main_func_js.push(jsf);
    }
}


module.exports = PAIHomePage;
