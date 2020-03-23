/*
    PAI Image
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


class PAI_IMAGE
{
    constructor()
    {
        this.id = pai_utils_pai_guid();
        this.name = name;
        this.html_object =  null;
        this.src = null;
        this.style = "";
        this.css_class = "pai-image";
        this.title = "";
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
        if (data.hasOwnProperty("id")) {
            this.id = data["id"];
        }
        if (data.hasOwnProperty("image")) {
            this.src = data["image"];
        }

    }

    get_html()
    {
        let ztag = `<div id ="` + this.id + `" class = "` + this.css_class + `">
        <img id ="`+ this.id + `-image" src="` + this.src +`"  alt="` + this.title+`" title="` + this.title +`"/> </div>`;
        return  ztag;

    }

}

var pai_images = {"image-name":null};


function pai_image_get(name)
{
    let image = (pai_images.hasOwnProperty(name)) ? pai_images[name] : null;

    return image;
}

function pai_image_add(parent,pai_image_data)
{
    let image_data = JSON.parse(pai_image_data);
    let image = new PAI_IMAGE();
    pai_images[name] = image;
    image.parse(image_data);
    $("#" + parent).append(image.get_html());

}

