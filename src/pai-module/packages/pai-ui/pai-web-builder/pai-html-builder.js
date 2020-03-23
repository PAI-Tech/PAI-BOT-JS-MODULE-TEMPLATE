/*
 PAI Web Builder
 Author       : Tamir Fridman
 Date Created : 13/12/2018
 Copyright PAI-TECH 2018, all right reserved

 This is the web builder part of the bot!
 now the bot can create web page


 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */



const pai_utils = require('@pai-tech/pai-code').PAIUtils;
const path = require('path');
const pai_html_writer = require("./pai-html-writer");


const packages_base_folder = "packages" + path.sep;


const PAIUI = require("../pai-ui");

class PAI_HTML_BUILDER {

    constructor() {

        this.pai_ui = PAIUI.get_instance;



        this.web_site_url = null;
        this.web_site_name = null;

    }



    parse_packages(imports)
    {
        let files = "";

            for (let i=0;i< imports.length;i++)
            {


                if(this.pai_ui.packages.hasOwnProperty(imports[i]))
                {
                    files += this.pai_ui.packages[imports[i]].get_html_includes();
                }
                else {
                    let pkg_obj = this.pai_ui.get_package(imports[i]);
                    if (pkg_obj) {
                        this.pai_ui.packages[imports[i]] = pkg_obj;
                        files += pkg_obj.get_html_includes();
                    }
                }
            }

        return files;
    }





    loop_page_data(pdata,html_out)
    {
        //console.log(">>>" + pdata.name);
        for (let key in pdata)
        {
            if(this.pai_ui.packages.hasOwnProperty(key))
            {
                (this.pai_ui.packages[key]).parse(key,pdata[key],html_out);
                this.loop_page_data(pdata[key],html_out);
            }
        }
    }


    get_page(page_data)
    {
        let html_obj = pai_html_writer.build_tag("html","pai-html-page");
        let body_tag = pai_html_writer.build_tag("body","pai-body","","margin:0;background-color:#FFFFFF;color:#000044");
        let html_out = {
            start_html : html_obj.start_tag + pai_html_writer.get_html_header(page_data.metadata,this.parse_packages(page_data.import)) + body_tag.start_tag,
            end_html: body_tag.end_tag + html_obj.end_tag,
            main_func_js:[]
        };
        this.loop_page_data(page_data.content,html_out);
        let main_func = `<script language="javascript">function pai_main(){console.log(":] Hey");`;
        for (let idx in html_out.main_func_js)
        {
            main_func += html_out.main_func_js[idx] + "\n";
        }
        main_func += `}</script>`;
        return html_out.start_html + html_out.end_html + main_func;
    }




    add_slider(slider_id)
    {
        return `<div id='${slider_id}' class="swiper-container">
		        <div class="swiper-wrapper" id='channels-slider'>
		        </div>
		        <div class="swiper-scrollbar"></div>
		    </div>`;
    }







    /*
        pai-text-field
        --------------
        field-name
        field-type (text/password)
        label-text
        placeholder
        class (css class)
        style (css style)

     */
    get_pai_input_field(pai_field)
    {
       let placeholder_txt = (pai_field.hasOwnProperty("placeholder")) ? ` placeholder="${pai_field["placeholder"]}" ` : "";
       let style_txt = (pai_field.hasOwnProperty("style")) ? ` style="${pai_field["style"]}" ` : "";
       let class_txt = (pai_field.hasOwnProperty("class")) ? pai_field["class"]  : "";
       let field = `<div class="pai-field">
                <div style="width:40%" class="pai-label">${pai_field["label-text"]}</div>
                <div style="width:60%;height:30px;">
                    <input id="${pai_field["field-name"]}" name="${pai_field["field-name"]}" type="${pai_field["field-type"]}" ${placeholder_txt + style_txt} class="pai-input-field ${class_txt}"/>
                </div>
            </div>`;
       return field;
    }

    /*
        pai-button-field
        --------------
        field-name
        caption
        class (css class)
        style (css style)
        onclick (JS function)
     */
    get_pai_button_field(pai_field)
    {
        let caption = (pai_field.hasOwnProperty("caption")) ? pai_field["caption"] : "";
        let style_txt = (pai_field.hasOwnProperty("style")) ? ` style="${pai_field["style"]}" ` : "";
        let class_txt = (pai_field.hasOwnProperty("class")) ? pai_field["class"]  : "";
        let field = `<div class="pai-field">
                <div style="width:100%;height:100%;">
                    <input type="button" id="${pai_field["field-name"]}" ${style_txt}  value="${caption}" class="pai-button ${class_txt}" onclick="${pai_field.onclick}"/>
                </div>
            </div>`;
        return field;
    }

    get_login_page(panel_data)
    {
        let style_txt = (panel_data.hasOwnProperty("style")) ? ` style="${panel_data["style"]}" ` : "";
        let res=`<div id="pai-login-panel" ${style_txt}>
		    <div class="pai-black-wall"></div>
		    <div id='pai-login-box' >` +
                this.get_pai_input_field({"field-name":"pai-user-name",
                    "field-type":"text",
                    "label-text":"User Name",
                    "placeholder":"user name goes here"
                }) +
                this.get_pai_input_field({"field-name":"pai-user-pwd","field-type":"password","label-text":"Password"}) +
                this.get_pai_button_field({"field-name":"pai-user-name",
                    "caption":"Login",
                    "onclick":"alert('login')"
                }) +
            `</div></div>`;
        return res;
    }
}

module.exports = PAI_HTML_BUILDER;