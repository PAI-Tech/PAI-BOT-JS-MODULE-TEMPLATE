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





class PAIView extends PAIUIBasePackage {


    constructor() {
        super();

        this.package_name = 'pai-ui/pai-view';
        this.package_files = [
            {"file-name": "pai-view.css", "type": "stylesheet"},
            {"file-name": "pai-view.js", "type": "script"},
        ];
    }

    get_pai_view(view_data)
    {
        let id = (view_data.hasOwnProperty("id")) ? view_data.id : pai_utils.pai_guid();
        let style_txt = (view_data.hasOwnProperty("style")) ? ` style="${view_data["style"]}" ` : "";
        let class_txt = (view_data.hasOwnProperty("class")) ? view_data["class"]  : "";
        let inner_txt = (view_data.hasOwnProperty("text")) ? view_data["text"]  : "";

        return `<div id='${id}'  class="pai-view ${class_txt}" ${style_txt}>${inner_txt}</div>`;
    }


    /*
       pai-view
       --------------
       id
       class (css class)
       style (css style)
       text (inner text)
    */
    parse(key,data,html_out)
    {
        // html_out.start_html += this.get_pai_view(data);


        let _data = JSON.stringify(data);
        let _data_id = "view_data_" + new Date().valueOf();
        let jsf = "let " + _data_id + " = `" + _data + "`;pai_view_add('pai-desktop'," + _data_id + ");\n";
        html_out.main_func_js.push(jsf);
    }
}


module.exports = PAIView;