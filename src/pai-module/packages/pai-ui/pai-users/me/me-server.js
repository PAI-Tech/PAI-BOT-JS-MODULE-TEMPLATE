/*
 Module       : PAI-UI-KIT
 File         : ME - my profile
 Description  : Server side implementation
 Author       : Tamir Fridman
 Date Created : 19/11/2018
 Copyright PAI-TECH 2018, all right reserved
  */


//const pai_utils = require('@pai-tech/pai-code').PAIUtils;



const PAIUIBasePackage  = require('../../pai-ui-base-package');





class PAI_ME extends PAIUIBasePackage {


    constructor() {
        super();

        this.package_name = 'pai-ui/pai-users/me';
        this.package_files = [
            {"file-name": "me.css", "type": "stylesheet"},
            {"file-name": "me.js", "type": "script"},
        ];
    }




    /*
       pai-me
       --------------
       id
       video (source of the video)
       loop
       autoplay
       controls
       muted
       video-fill (none/fill/contain/cover/scale-down  == css object-fit)
       class (css class)
       style (css style)
    */

    parse(key,data,html_out)
    {
        let player_data = JSON.stringify(data);
        let player_data_id = "pai_data_" + new Date().valueOf();
        let jsf = "let " + player_data_id + " = `" + player_data + "`;me_get('pai-desktop'," + player_data_id + ");\n";
        html_out.main_func_js.push(jsf);

        //html_out.start_html += this.get_pai_video_player(data);

    }
}


module.exports = PAI_ME;