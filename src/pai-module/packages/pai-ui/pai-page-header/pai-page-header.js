/*
    PAI UI KIT
    PAI-PAGE-HEADER
     Description  : Client based UI kit
     Author       : Tamir Fridman
     Date Created : 19/11/2018
     Copyright PAI-TECH 2018, all right reserved
 */


function pai_utils_pai_guid() {
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


class PAI_PAGE_HEADER {
    constructor() {
        this.id = pai_utils_pai_guid();
        this.name = "pai-page-header";
        this.html_object = null;
        this.src = null;
        this.style = "";
        this.css_class = "pai-page-header";
        this.title = "";
        this.logo = null;
    }


    parse(data) {

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

    get_html() {
        let ztag = '';
        if (localStorage.getItem("pai-token")) {
            ztag = `<nav pai-code="pai-page-header" id ="pai-page-header" style="background-color: white !important" class = " justify-content-between navbar  navbar-light bg-light ` + this.css_class + `">
<div id="pai-page-header-buttons-panel" style="z-index: 10;" class="d-none d-sm-block">
            <div id="pai-page-header-buttons-panel-pane"  style="display:inline-flex;margin-right: 50px"></div>
        </div>
        <div id="pai-page-header-navbrand" title="Home" onclick="pai_go_home();" class="navbar-brand"><img height="30" id ="` + this.id + `-image" src="` + this.logo + `"  alt="` + this.title + `" title="` + this.title + `"/> <span style="font-size:25px;margin-top:2px;color: #000044">${this.title}</span></div>
        
        <div><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#pai-page-header-dropdown" aria-controls="pai-page-header-dropdown" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button></div>
        <div id="pai-page-header-dropdown" class="collapse navbar-collapse justify-content-end" style="">
            <ul id="pai-page-header-dropdown-list" class="nav navbar-nav mr-auto ">
            </ul>
        </div>
        
        
        </nav>`;
        } else {
            ztag = `<div pai-code="pai-page-header" id ="pai-page-header" class = "` + this.css_class + `">
        <div id="pai-page-header-logo" title="Home" onclick="pai_go_home();"><img id ="` + this.id + `-image" src="` + this.logo + `"  alt="` + this.title + `" title="` + this.title + `"/> </div>
        </div>`
        }
        return ztag;
    }

    add_button(pai_unparsed_data) {
        let pai_data = isObject(pai_unparsed_data) ? pai_unparsed_data : JSON.parse(pai_unparsed_data);
        let sel = "";
        let i_on_click = (pai_data.hasOwnProperty("onclick")) ? `onclick="` + pai_data.onclick + `"` : "";
        let anim = (pai_data.hasOwnProperty("anim")) ? pai_data.anim : "";
        let __title = pai_data.title;
        if (pai_data.hasOwnProperty("status")) {
            sel = "pai-page-header-" + pai_data.status;
            if (pai_data.status == "na") {
                __title += " | Coming soon"
            }
        }
        let btn_html = `<div id="pai-page-header-btn-` + pai_data.name + `" class="` + anim + ` nav-item pai-buttons-panel-button ` + sel + ` " ` + i_on_click + `><image src="` + pai_data.icon + `" title="` + __title + `"/></div>`;
        $("#pai-page-header-buttons-panel-pane").append(btn_html)
    }

    add_buttons(header_menu_buttons) {
        let pai_data = JSON.parse(header_menu_buttons);
        for (let button in pai_data) {
            this.add_button(pai_data[button]);
        }
    }

    add_menu(header_menu) {
        let pai_data = JSON.parse(header_menu);

        let dropdown_obj = $("#pai-page-header-dropdown-list");

        for (let item in pai_data) {
            let on_click_code = (pai_data[item].hasOwnProperty("onclick")) ? ` onclick="${pai_data[item].onclick}" ` : "";
            let a = "";


            if (pai_data[item].hasOwnProperty("dropdown")) {
                a = `<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${pai_data[item].title}</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">Dropdown shoulb be here</a>
                    </div>`;


            }
            else {
                a = `<a class="nav-link" ${on_click_code} href="#">${pai_data[item].title}</a>`;
            }
            a += "</a>";
            dropdown_obj.append(`<li class="nav-item" style="font-size: 20px">${a}</li>`);
        }
    }

}

//Singletone
var pai_page_header = null;

function isObject(val) {
    if (val === null) {
        return false;
    }
    return ((typeof val === 'function') || (typeof val === 'object'));
}

function pai_page_header_get(parent, pai_data) {
    if (!pai_page_header) {
        pai_page_header = new PAI_PAGE_HEADER();
        let i_data = JSON.parse(pai_data);
        pai_page_header.parse(i_data);
        $("#" + parent).append(pai_page_header.get_html());
    }
    return pai_page_header;
}



function pai_go_home() {
    document.location = "home";
}


function pai_change_page(page) {
    document.location = page;
}

function pai_page_header_animate() {
    $("#pai-page-header").addClass("color-change-2x");
}


function pai_page_header_stop_animate() {
    $("#pai-page-header").removeClass("color-change-2x");
}
