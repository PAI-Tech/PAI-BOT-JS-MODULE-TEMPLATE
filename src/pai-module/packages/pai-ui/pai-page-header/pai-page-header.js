/*
    PAI UI KIT
    PAI-PAGE-HEADER
     Description  : Client based UI kit
     Author       : Tamir Fridman
     Date Created : 19/11/2018
     Copyright PAI-TECH 2018, all right reserved
 */


function pai_utils_pai_guid () {
    let chars = '0123456789abcdef'.split('');

    let uuid = [], rnd = Math.random, r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4'; // version 4

    for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | rnd() * 16;

            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r & 0xf];
        }
    }

    return uuid.join('');
}


class PAI_PAGE_HEADER
{
    constructor()
    {
        this.id = pai_utils_pai_guid();
        this.name = "pai-page-header";
        this.html_object =  null;
        this.src = null;
        this.style = "";
        this.css_class = "pai-page-header";
        this.title = "";
        this.logo = null;
    }


    parse(data)
    {

        if (data.hasOwnProperty("style")) {
            this.style = data["style"];
        }
        if (data.hasOwnProperty("title")) {
            this.title = data["title"];
        }
        if (data.hasOwnProperty("class")) {
            this.css_class += " " + data["class"];
        }
        if (data.hasOwnProperty("id")) {
            this.id = data["id"];
        }
        if (data.hasOwnProperty("logo")) {
            this.logo = data["logo"];
        }

    }

    get_html()
    {
        let ztag = `<div pai-code="pai-page-header" id ="pai-page-header" class = "` + this.css_class + `">
        <div id="pai-page-header-logo" title="Home" onclick="pai_go_home();"><img id ="`+ this.id + `-image" src="` + this.logo +`"  alt="` + this.title+`" title="` + this.title +`"/> </div>
        <div id="pai-page-header-buttons-panel"></div>
        </div>`;
        return  ztag;
    }

    add_button(pai_unparsed_data)
    {
        let pai_data = JSON.parse(pai_unparsed_data);
        let sel =   "";
        let i_on_click = (pai_data.hasOwnProperty("onclick")) ? `onclick="` + pai_data.onclick + `"` : "";
        let anim = (pai_data.hasOwnProperty("anim")) ? pai_data.anim :"";
        let __title = pai_data.title;
        if(pai_data.hasOwnProperty("status"))
        {
            sel = "pai-page-header-" + pai_data.status;
            if(pai_data.status == "na")
            {
                __title += " | Coming soon"
            }
        }
        let btn_html = `<div id="pai-page-header-btn-` + pai_data.name + `" class="` + anim + ` pai-buttons-panel-button ` + sel  + ` " ` + i_on_click + `><image src="` + pai_data.icon + `" title="` + __title + `"/></div>`;
        $("#pai-page-header-buttons-panel").append(btn_html)
    }

}

//Singletone
var pai_page_header = null;


function pai_page_header_get(parent,pai_data)
{
    if(!pai_page_header)
    {
        pai_page_header = new PAI_PAGE_HEADER();
        let i_data = JSON.parse(pai_data);
        pai_page_header.parse(i_data);
        $("#" + parent).append(pai_page_header.get_html());
    }
    return pai_page_header;
}


function pai_search()
{
    document.location = "search";
}



function pai_go_home()
{
    document.location = "home";
}

function pai_change_page(page)
{
    document.location = page;
}

function pai_page_header_animate()
{
    $("#pai-page-header").addClass("color-change-2x");
}


function pai_page_header_stop_animate()
{
    $("#pai-page-header").removeClass("color-change-2x");
}