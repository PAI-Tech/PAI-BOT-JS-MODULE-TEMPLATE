//    pai-web-router




const { PAICodeCommand, PAICodeCommandContext, PAICodeModule, PAICode, PAIModuleConfigParam, PAIModuleConfig, PAILogger, PAIModuleCommandSchema, PAIModuleCommandParamSchema } = require('@pai-tech/pai-code');


const pai_utils = require('@pai-tech/pai-code').PAIUtils;

const path = require('path');
const fs = require('fs');


const pai_module_data = require("../data/pai-module-data").get_instance;

const PAIWebBuilder = require('../packages/pai-ui/pai-web-builder/pai-html-builder');

class PAI_WEB_ROUTER
{
    constructor() {

        this.web_builder = new PAIWebBuilder();
    }





    get_static_folder(req, res,folder,route)
    {

        let path2 = path.resolve(__dirname,"../" + folder);

        res.sendFile(path2 + "/" + route);
    }



    get_metadata()
    {
        let out =  {
            "page-title": "PAI-TECH",
            keywords: "Bot Operating System Standard",
            author: "PAI-BOT",
            description: "Bot Operating System Standard",
            icon: "public/images/pai/pai-bot.png",

        };
        return out;
    }

    get_header_button(name,title,icon,status,onclick,animation)
    {
        let out = {
            name:name,
            title:title,
            icon:icon,
            status:status,
            onclick:onclick,
            anim:animation
        }
        return out;
    }

    get_page_header(animation,selected)
    {
        if (!animation)
            animation = "";
        let out = {
            id:'main-page-header',
            logo:"public/images/pai/pai-tech-logo-blue-03-1.png",
            title:"Bot Operating System Standard | PAI-TECH",
            buttons: [
                this.get_header_button("home","Home","public/images/icons/home.png",(selected == "home") ? "selected" : "ok",'pai_go_home()',animation),
                this.get_header_button("me","My Profile","public/images/icons/me.png",(selected == "me") ? "selected" : "ok",'pai_me()',animation),
                this.get_header_button("calendar","Scouting Tracking","public/images/icons/calendar.png",(selected == "scouting") ? "selected" : "ok" /*"na"*/,'scouting_tracking()',animation),
                this.get_header_button("inbox","Inbox","public/images/icons/inbox.png","na",'void',animation),
                this.get_header_button("notifications","Notifications","public/images/icons/notification.png","na",'void',animation),
                this.get_header_button("log_out","Logout","public/images/icons/logout.png","ok",'pai_logout()',animation),
            ]
        };
        return out;
    }




    get_home(req, res,route)
    {
        let page_data  = {
            id: pai_utils.pai_guid(),
            import: ["pai-desktop","pai-page-header","pai-page","pai-video-player"],
            metadata: this.get_metadata(),
            content: {
                "pai-desktop": {
                    "pai-page-header" :  this.get_page_header("fade-in","home"),
                    "pai-video-player": {
                        id: "preview-player",
                        style: "display:block;position:absolute;top:10%;left:10%;width:80%;height:80%",
                        "video-fill": "fill"
                    },
                    "pai-page": {
                    }
                }
            }

        };
        //console.log(JSON.stringify(page_data));
        res.send(this.web_builder.get_page(page_data));
    }


}

module.exports = PAI_WEB_ROUTER;