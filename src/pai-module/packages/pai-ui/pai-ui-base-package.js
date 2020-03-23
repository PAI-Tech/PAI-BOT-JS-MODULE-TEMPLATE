/*
 Module       : PAI-UI-KIT
 File         : pai-desktop-server
 Description  : Server side implementation
 Author       : Tamir Fridman
 Date Created : 19/11/2018
 Copyright PAI-TECH 2018, all right reserved
  */


//const {PAIDataSource, PAIEntity, PAIEntityList} = require('@pai-tech/pai-code');

//const pai_utils = require('@pai-tech/pai-code').PAIUtils;


const path = require('path');
const fs = require('fs');
const PAILogger  = require('@pai-tech/pai-code').PAILogger;



const pai_html_writer = require("./pai-web-builder/pai-html-writer");



class PAIUIBasePackage {


    constructor() {

        this.package_files = null;
        this.package_name = 'pai-ui';


    }





    get_html_includes()
    {
        let res=`<!-- include file for ${this.package_name} -->`;
        for (let i=0 ; i< this.package_files.length;i++) {
            if (this.package_files[i].hasOwnProperty("file-name") && this.package_files[i].hasOwnProperty("type")) {
                let file_url =  this.package_name + "/" + this.package_files[i]["file-name"];

                if (this.package_files[i]["type"] == "stylesheet") {
                    res += `<link rel="stylesheet" type="text/css" href="packages/${file_url}">`;
                }
                else if(this.package_files[i]["type"] == "script")
                {
                    res += `<script src="packages/${file_url}"></script>`;
                }
            }
        }
        return res;

    }

}


module.exports = PAIUIBasePackage;