/*
    PAI Desktop
     Description  : Client based UI kit
     Author       : Tamir Fridman
     Date Created : 19/11/2018
     Copyright PAI-TECH 2018, all right reserved
 */

//const PAI_STARTUP_BOT_URL = "https://tf-su.pai-net.org";
//const THE_FLOOR_BOT_URL = "https://tf-crm.pai-net.org";
//const PAI_BANK_BOT_URL = "https://tf-bk.pai-net.org";
//const PAI_INBOX_BOT_URL = "https://tf-bk.pai-net.org:4431";

var pai_desktop_version = "1.0.0";

var pai_desktop_params = {};

let pai_tmp_content = null;

function pai_desktop_startup()
{
    console.log(":] pai-desktop v:" + pai_desktop_version + " is alive");
}



function pai_desktop_set_params(i_data)
{
    pai_desktop_params = JSON.parse(i_data);
}


function pai_desktop_set_param(param_name,param_value)
{
    pai_desktop_params[param_name] = param_value;
}

function pai_desktop_get_param(param_name)
{
    return pai_desktop_params[param_name];
}



// The calling page can add pai_main() function that will be called when the desktop is loaded

$( document ).ready(function()
{
    pai_desktop_startup();
    if (typeof pai_main === "function") {
        pai_main();
    }

});


function pai_logout()
{
    document.location = "login";
}

function pai_me()
{
    document.location = "me";
}

function scouting_tracking()
{
    document.location = "scouting-tracking";
}


function pai_show_video(url)
{
    window.open(url);
}