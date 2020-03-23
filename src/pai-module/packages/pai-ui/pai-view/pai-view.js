/*
    PAI View
     Description  : Client based UI kit
     Author       : Tamir Fridman
     Date Created : 19/11/2018
     Copyright PAI-TECH 2018, all right reserved
 */




class PAI_VIEW
{
    constructor(data)
    {
        this.id = data.id;
        this.name = data.id;
        this.title = "";
        this.style = "";
        this.css_class = "";

        this.parse(data);
    }

    get_html_object()
    {
        return document.getElementById(this.id);
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
            this.css_class = data["class"];
        }
    }

    get_html()
    {


        let res= `<div id='` + this.id + `'  class="pai-view ` + this.css_class + `" style="` + this.style + `"></div>`;

        return res;
    }

    set_text(text)
    {
        let html_obj = this.get_html_object();
        html_obj.innerText = text;
    }
}

var pai_views = {"view-name":null};


function pai_view_get(name)
{
    let view = (pai_views.hasOwnProperty(name)) ? pai_views[name] : null;

    return view;
}



function pai_view_add(parent,pai_data)
{
    let data = JSON.parse(pai_data);
    let name = data.id;
    let view = new PAI_VIEW(data);

    pai_views[name] = view;
    if(parent){
        $("#" + parent).append(view.get_html());
    }
}

