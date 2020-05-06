/**
 * fresh - universal user interface (UI) framework
     Author       : Tamir Fridman
     Date Created : 03/05/2020
     Copyright PAI-TECH 2020, all right reserved
 */

const fresh_object_fields = ["type","id","name","style","css-class","html","text","title","src"];
const html_fields_mapping = {
    "id": "id", "name": "name", "css-class": "class","style":"style","src":"src"
};

const fresh_object_types = {
    "view" : "div" , "label" : "label", "image":"img"
}



class fresh_object
{
    constructor(data)
    {
        fresh_object_fields.forEach(field => this[field] = null);
        this.id = "pai-code-object-";
        this["html-tag"] = "div";
        this.type = "view"
        this.html = "";
        this.childs =[];
        if(data)
        {
            this.parse(data);
        }
    }

    parse(data)
    {

        fresh_object_fields.forEach(field => {
            if (data.hasOwnProperty(field)) {
                this[field] = data[field];
            }
        });
        this["html-tag"] = fresh_object_types[this.type];
    }



    log()
    {
        let keys = Object.keys(this);
        keys.forEach(key => {
            if(this[key])
            {
                console.log(key + ":" + this[key]);
            }

        });
        console.log(this.get_html());
    }

    get_html()
    {
        this.html = `<${this["html-tag"]} `;
        let fields = Object.keys(html_fields_mapping);

        fields.forEach(field => {
            if (this[field]) {
                this.html += ` ${html_fields_mapping[field]}="${this[field]}"`
            }
        });

        if( (!this["text"] || this["text"].length == 0) && this.childs.length == 0)
        {
            this.html += " />";
        }
        else
        {
            this.html += ">";
            if(this["text"] && this["text"].length > 0)
            {
                this.html += this["text"];
            }
            if(this.childs.length>0)
            {
                this.childs.forEach( child => {
                    this.html += child.get_html();
                })
            }
            this.html += `</${this["html-tag"]}>`;
        }
        return this.html;
    }

    append(fresh_obj) {
        this.childs.push(fresh_obj);
        $("#" + this.id).append(fresh_obj.get_html());
    }

}


