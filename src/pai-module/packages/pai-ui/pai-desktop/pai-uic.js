/*

    PAI UI Client
 */




class PAI_UIC {

    constructor() {
        this.pai_ui_objects =
            {
                "pai-page-title" : (data) => `<div><h3>${data.title}</h3></div>`,
                "pai-input-field" : (data) => pai_ui.get_input_field(data),
                "pai-image" : (data) => PAI_HTML_WRITER.get_image_tag(data)
            };
    }

    get_input_field(data)
    {
        if(!data.value || data.value == undefined)
        {
            data.value="";
        }
        let out = `<div class="input-group input-group-sm mb-3 col-sm-6"><div class="input-group-prepend"><span class="input-group-text" id="inputGroup-sizing-sm">${data.label}</span></div><input type="text" id="${data.id}" placeholder="${data["placeholder"]}" class="form-control" aria-label="" value="${data.value}" aria-describedby="inputGroup-sizing-default"></div>`;
        return out;
    }

    get_form_group(id, label,rows)
    {
        let out = `<div id='${id}' class="form-group" style="border-bottom: #cccccc 1px solid">
                    <label>${label}</label>
                    <div class="container-fluid">
                        <div class="row">${rows}</div>
                    </div></div>`;
        return out;
    }

    get_pai_ui_object(pai_ui_object_name,pc_data)
    {
        return this.pai_ui_objects[pai_ui_object_name](pc_data);
    }


}


const pai_ui = new PAI_UIC();


class PAI_HTML_WRITER {

    constructor() {

    }



    static start_tag(tag_name, id, css_class, style) {
        let res = `<${tag_name}`;
        if (id) {
            res += ` id="${id}"`;
        }
        if (style) {
            res += ` style="${style}"`;
        }
        if (css_class) {
            res += ` class="${css_class}"`;
        }
        res += ">";
        return res;
    }


    static close_tag(tag_name) {
        return `</${tag_name}>`;
    }

    static get_image_tag(data) {
        let img = `<img id="${data.id}" src="${data.src}"`;


        if (data.style) {
            img += ` style="${data.style}"`;
        }
        if (data["css-class"]) {
            img += ` class="${data["css-class"]}"`;
        }

        if (data.title) {
            img += ` alt="${data.title}" title="${data.title}"`;
        }

        img += " />";
        return img;
    }


    static build_tag(tag_name, id, css_class, style, onclick_func) {
        let start_tag_attributes = "";

        if (id) {
            start_tag_attributes += ` id="${id}"`;
        }
        if (style) {
            start_tag_attributes += ` style="${style}"`;
        }
        if (css_class) {
            start_tag_attributes += ` class="${css_class}"`;
        }
        if (onclick_func) {
            start_tag_attributes += ` onclick="${onclick_func}"`;
        }

        let res_obj = {
            start_tag: `<${tag_name + start_tag_attributes}>`,
            end_tag: `</${tag_name}>`
        };
        return res_obj;
    }

}