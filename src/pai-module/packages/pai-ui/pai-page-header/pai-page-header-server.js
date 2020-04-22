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

function pai_guid_under () {
    let chars = '0123456789abcdef'.split('');

    let uuid = [], rnd = Math.random, r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '_';
    uuid[14] = '4'; // version 4

    for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | rnd() * 16;

            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r & 0xf];
        }
    }

    return uuid.join('');
};

class PaiPageHeaderServer extends PAIUIBasePackage {


    constructor() {
        super();

        this.package_name = 'pai-ui/pai-page-header';
        this.package_files = [
            {"file-name": "pai-page-header.css", "type": "stylesheet"},
            {"file-name": "pai-page-header.js", "type": "script"},
        ];


    }


    parse(key,data,html_out)
    {
        let i_data = JSON.stringify(data);
        let i_data_id = "ph_data_" + new Date().valueOf();
        let jsf = "let " + i_data_id + " = `" + i_data + "`;var pph = pai_page_header_get('pai-desktop'," + i_data_id + ");\n";

        html_out.main_func_js.push(jsf);


        if(data.hasOwnProperty("buttons"))
        {
            let var_id = "sig_name_" + pai_guid_under();
            let b1_data = JSON.stringify(data.buttons);
            let jsf1 = `let ` + var_id +  `= '` + b1_data + `';pph.add_buttons(` + var_id +  `);`;
            html_out.main_func_js.push(jsf1);
        }

        if(data.hasOwnProperty("menu"))
        {
            let var_id = "sig_name_" + pai_guid_under();
            let b1_data = JSON.stringify(data.menu);
            let jsf1 = `let ` + var_id +  `= '` + b1_data + `';pph.add_menu(` + var_id +  `);`;
            html_out.main_func_js.push(jsf1);
        }

    }
}


module.exports = PaiPageHeaderServer;