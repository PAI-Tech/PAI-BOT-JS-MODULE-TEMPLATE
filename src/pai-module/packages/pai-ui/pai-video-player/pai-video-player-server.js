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





class PAIVideoPlayer extends PAIUIBasePackage {


    constructor() {
        super();

        this.package_name = 'pai-ui/pai-video-player';
        this.package_files = [
            {"file-name": "pai-video-player.css", "type": "stylesheet"},
            {"file-name": "pai-video-player.js", "type": "script"},
        ];
    }

    get_pai_video_player(player_data)
    {
        let video_src = (player_data.hasOwnProperty("video")) ?  ` src=${player_data.video} `  : "";
        let style_txt = (player_data.hasOwnProperty("style")) ? ` style="${player_data["style"]}" ` : "";
        let class_txt = (player_data.hasOwnProperty("class")) ? player_data["class"]  : "";
        let video_fill = (player_data.hasOwnProperty("video-fill")) ? ` style="object-fit:${player_data["video-fill"]}" `  : "";
        let autoplay = (player_data.hasOwnProperty("autoplay") && player_data.autoplay) ?  " autoplay "  : "";
        let loop = (player_data.hasOwnProperty("loop") && player_data.loop) ? " loop "  : "";
        let controls = (player_data.hasOwnProperty("controls") && player_data.controls) ? " controls "  : "";
        let muted = (player_data.hasOwnProperty("muted") && player_data.muted) ? " muted "  : "";

        let script = `<script language="javascript">pai_video_player_add("${player_data}");</script>`

        let res= `<div id='${player_data.id}-view'  class="pai-video-player ${class_txt}" ${style_txt}>
			<video id='${player_data.id}' ${video_src} class="pai-video-player-video" playsinline="true" webkit-playsinline="true" ${autoplay + loop + controls + muted} ${video_fill} type="application/x-mpegURL"></video>
			${script}
		</div>`;

        return res;
    }


    /*
       pai-video-player
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
        let player_data_id = "player_data_" + new Date().valueOf();
        let jsf = "let " + player_data_id + " = `" + player_data + "`;pai_video_player_add('pai-desktop'," + player_data_id + ");\n";
        html_out.main_func_js.push(jsf);

        //html_out.start_html += this.get_pai_video_player(data);

    }
}


module.exports = PAIVideoPlayer;