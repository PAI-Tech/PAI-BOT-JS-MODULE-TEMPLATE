/**
 * spell - universal user interface (UI) framework
 * Author       : Tamir Fridman
 * Date Created : 03/09/2020
 * Copyright PAI-TECH 2020, all right reserved
 */

//special html attribute mapping (for reserved words)

spell_object_html_fields_mapping = {
    "_id": "id",  "css-class": "class"
};

class SPELL_OBJECT
{
    static get_spell_uid()
    {
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


    constructor(data)
    {

        let defeault_id_name = "spell-object-" + SPELL_OBJECT.get_spell_uid();
        this._id = defeault_id_name;
        this.name = defeault_id_name;
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

        let cdata = Object.keys(data);
        cdata.forEach(field => {
            if (data.hasOwnProperty(field)) {
                this[field] = data[field];
            }
        });
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



        let fields = Object.keys(this);

        fields.forEach(field => {
            if (this[field] && this.hasOwnProperty(field)) {
                let f_out = field;
                if(spell_object_html_fields_mapping.hasOwnProperty(field))
                {
                    f_out = spell_object_html_fields_mapping[field];
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

    append(spell_obj) {
        this._childs.push(spell_obj);
        if(this._html) {
            this.jquery_object.append(spell_obj.get_html());
        }
    }

    set_style(attr,val)
    {
        this.jquery_object.css(attr,val);
    }
}


class SPELL_VIEW extends SPELL_OBJECT
{
    constructor(data) {
        super(data);
    }
}



class SPELL_TEXT_FIELD extends SPELL_OBJECT
{
    constructor(data) {
        super(data);
        this._html_tag = "input";
        this._type = "text";
    }

    set_text(text)
    {
        this.text = text;
        this.jquery_object.val(text);
    }
}


class SPELL_LABEL extends SPELL_OBJECT
{
    static get  defaults()  {
        let oid = "label-" + SPELL_OBJECT.get_spell_uid();
        let def = {
            _id: oid,
            name: oid,
            text: oid,
            style: "color:black;margin:10% 0 0 10% ;width:80%;height:30px;",
        }
        return def;
    }

    constructor(data) {
        super(data);
        this._html_tag = "label";
        this._type = "label";
    }

    set_text(text)
    {
        this.text = text;
        this.jquery_object.text(text);
    }
}

class SPELL_BUTTON extends SPELL_OBJECT
{
    constructor(data) {
        super(data);
        this._html_tag = "button";
        this._type = "button";
    }

    set_text(text)
    {
        this.text = text;
        this.jquery_object.val(text);
    }

    set_onclick(fun)
    {
        this.onclick = fun;
    }
}


class SPELL_FORM_TEXT_FIELD extends SPELL_VIEW
{
    constructor(data) {
        super(data);
        this.label = new SPELL_LABEL(SPELL_LABEL.defaults);

        this.append(this.label);

    }

    set_text(text)
    {
        this.text = text;
        this.jquery_object.val(text);
    }
}




class SPELL_WINDOW extends SPELL_VIEW
{
    constructor(data) {
        super(data);
        this.close_button = new SPELL_BUTTON({
            _type : "button",
            _id: "test-btn",
            name: "test-btn",
            text:"x",
            value:"x",
            style: "background-color:white;border:solid black 1px;width:30px;height:30px",
            onclick: "alert(this.id)"
        });

        this.append(this.close_button);
    }
}


