/**
 * fresh - universal user interface (UI) framework
     Author       : Tamir Fridman
     Date Created : 03/05/2020
     Copyright PAI-TECH 2020, all right reserved
 */

//const fresh_object_fields = ["name","css-class"];
const html_fields_mapping = {
    "_id": "id", "name": "name", "css-class": "class","style":"style","src":"src"
};

const fresh_object_types = {
    "view" : "div" , "label" : "label", "image":"img","video":"video"
}




class fresh_object
{
    constructor(data)
    {
       //fresh_object_fields.forEach(field => this[field] = null);
        this._id = "pai-code-object-";
        this._html_tag = "div";
        this._type = "view";
        this._jq_obj = null;
        this._html = "";
        this._childs =[];
        if(data)
        {
            this.parse(data);
        }
    }

    parse(data)
    {

        // fresh_object_fields.forEach(field => {
        //     if (data.hasOwnProperty(field)) {
        //         this[field] = data[field];
        //     }
        // });

        let cdata = Object.keys(data);
        cdata.forEach(field => {
            if (data.hasOwnProperty(field)) {
                this[field] = data[field];
            }
        });

        this._html_tag = fresh_object_types[this._type];
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
        this._html = `<${this._html_tag} `;

        // let fields = Object.keys(html_fields_mapping);
        //
        // fields.forEach(field => {
        //     if (this[field]) {
        //         this._html += ` ${html_fields_mapping[field]}="${this[field]}"`
        //     }
        // });

        let fields = Object.keys(this);

        fields.forEach(field => {
            if (this[field] && this.hasOwnProperty(field)) {
                let f_out = field;
                if(html_fields_mapping.hasOwnProperty(field))
                {
                    f_out = html_fields_mapping[field];
                }
                if(!f_out.startsWith("_")) {
                    this._html += ` ${f_out}="${this[field]}"`;
                }
            }
        });


        if( (!this["text"] || this["text"].length == 0) && this._childs.length == 0)
        {
            this._html += " />";
        }
        else
        {
            this._html += ">";
            if(this["text"] && this["text"].length > 0)
            {
                this._html += this["text"];
            }
            if(this._childs.length>0)
            {
                this._childs.forEach( child => {
                    this._html += child.get_html();
                })
            }
            this._html += `</${this._html_tag}>`;
        }
        return this._html;
    }

    get jquery_object()
    {
        if(!this._jq_obj)
        {
            this._jq_obj =$("#" + this._id);
        }
        return this._jq_obj;
    }

    get dom_element()
    {
        return document.getElementById(this._id);
    }

    append(fresh_obj) {
        this._childs.push(fresh_obj);
        if(this._html) {
            this.jquery_object.append(fresh_obj.get_html());
        }
    }



}


