/*
 Module       : PAI-UI-KIT
 File         : pai-desktop-server
 Description  : Server side implementation
 Author       : Tamir Fridman
 Date Created : 19/11/2018
 Copyright PAI-TECH 2018, all right reserved
  */


//const pai_utils = require('@pai-tech/pai-code').PAIUtils;



const PAIUIBasePackage  = require('../pai-ui-base-package');




const pai_html_writer = require("../pai-web-builder/pai-html-writer");

const pai_module_data = require("../../../data/pai-module-data").get_instance;

class PAIDesktop extends PAIUIBasePackage {


    constructor() {
        super();

        this.package_name = 'pai-ui/pai-desktop';
        this.package_files = [
            {"file-name": "pai-animator.css", "type": "stylesheet"},
            {"file-name": "pai-desktop.css", "type": "stylesheet"},
            {"file-name": "pai-desktop.js", "type": "script"},
            {"file-name": "pai-ui-utils.js", "type": "script"},
            {"file-name": "pai-net-connector.js", "type": "script"},
            {"file-name": "pai-ldb.js", "type": "script"},
            {"file-name": "pai-cdn.js", "type": "script"},
        ];

    }


    parse(key,data,html_out)
    {

        let ztag = pai_html_writer.build_tag("div", key);
        html_out.start_html += ztag.start_tag;
        html_out.end_html = ztag.end_tag + html_out.end_html;

        let i_data_id = JSON.stringify(pai_module_data.module_data);

        let jsf = "pai_desktop_set_params(`" + i_data_id + "`);";

        html_out.main_func_js.push(jsf);
    }


}


module.exports = PAIDesktop;