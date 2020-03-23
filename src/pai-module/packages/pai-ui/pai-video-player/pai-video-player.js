
/*
    PAI Video Player
     Description  : Client based UI kit
     Author       : Tamir Fridman
     Date Created : 19/11/2018
     Copyright PAI-TECH 2018, all right reserved
 */



class PAI_VIDEO_PLAYER
{
    constructor(data)
    {
        this.id = data.id;
        this.name = data.id;
        this.playing = false;
        this.title = "";
        this.video_src = null;
        this.style = "";
        this.css_class = "";
        this.video_fill = "none";
        this.autoplay = true;
        this.loop = false;
        this.controls = true;
        this.muted = true;
        this.parse(data);
    }

    get_html_object()
    {
        return document.getElementById(this.id);
    }

    toggle_pause()
    {
        let html_object  = this.get_html_object();
        if(this.playing)
        {
            html_object.pause();
        }
        else
        {
            html_object.play();
        }
        this.playing = !this.playing;
    }

    load(source)
    {
        let html_object  = this.get_html_object();

        // if(Hls.isSupported())
        // {
        //
        //     var hls = new Hls();
        //     hls.loadSource(source);
        //     hls.attachMedia(html_object);
        //     hls.on(Hls.Events.MANIFEST_PARSED,function()
        //     {
        //         html_object.play();
        //     });
        // }
        // else if (html_object.canPlayType('application/vnd.apple.mpegurl'))
        // {
        //     html_object.src = source;
        //     html_object.addEventListener('canplay',function()
        //     {
        //         html_object.play();
        //     });
        // }

        html_object.src = source;
        html_object.addEventListener('canplay',function()
        {
            html_object.play();
        });


        this.playing = true;
    }

    parse(player_data)
    {


        if (player_data.hasOwnProperty("style")) {
            this.style = player_data["style"];
        }
        if (player_data.hasOwnProperty("title")) {
            this.title = player_data["title"];
        }
        if (player_data.hasOwnProperty("class")) {
            this.css_class = player_data["class"];
        }

        if (player_data.hasOwnProperty("video")) {
            this.video_src = player_data["video"];
        }

        if (player_data.hasOwnProperty("video-fill")) {
            this.video_fill = player_data["video-fill"];
        }

        if (player_data.hasOwnProperty("autoplay")) {
            this.autoplay = player_data["autoplay"];
        }

        if (player_data.hasOwnProperty("loop")) {
            this.loop = player_data["loop"];
        }

        if (player_data.hasOwnProperty("controls")) {
            this.controls = player_data["controls"];
        }

        if (player_data.hasOwnProperty("muted")) {
            this.muted = player_data["muted"];
        }
    }

    get_html()
    {

        let autoplay_txt = (this.autoplay) ?  " autoplay "  : "";
        let loop_txt = (this.loop) ? " loop "  : "";
        let controls_txt = (this.controls) ? " controls "  : "";
        let muted_txt = (this.muted) ? " muted "  : "";


        let res= `<div id='` + this.id + `-view'  class="pai-video-player ` + this.css_class +`" style="` + this.style + `">
                <video id='` + this.id +`' src="` + this.video_src + `" class="pai-video-player-video" playsinline="true" webkit-playsinline="true" ` + autoplay_txt + loop_txt + controls_txt + muted_txt  + ` style="object-fit:` + this.video_fill + `" type="application/x-mpegURL"></video></div>`;

        return res;
    }
}

var pai_video_players = {"player-name":null};


function pai_video_player_get(name)
{
    let player = (pai_video_players.hasOwnProperty(name)) ? pai_video_players[name] : null;

    return player;
}



function pai_video_player_add(parent,pai_player_data)
{
    let data = JSON.parse(pai_player_data);
    let name = data.id;
    let player = new PAI_VIDEO_PLAYER(data);

    pai_video_players[name] = player;
    if(parent){
        $("#" + parent).append(player.get_html());
    }
}


function pai_video_player_change_stream(player_name,stream_source,player_logo,title)
{
    event.stopPropagation();
    let player = pai_video_player_get(player_name);
    if(player)
    {
       player.load(stream_source);
    }
    if(player_logo)
    {
        $("#pai-desktop-logo-image").attr("src",player_logo);
        pai_view_get("pai-page-title").set_text(title)
    }
}

function pai_video_player_toggle_pause(player_name)
{
    event.stopPropagation();
    let player = pai_video_player_get(player_name);
    player.toggle_pause();
}

