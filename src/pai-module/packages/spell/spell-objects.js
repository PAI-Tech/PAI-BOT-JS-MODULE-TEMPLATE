

class SpellView extends SpellObject {
    static get defaults()
    {
        let defs =  {
            _type : "view",
            "class":"pai-view"
        };
        return defs;
    }

    constructor(data) {
        if(!data) {data = SpellView.defaults;}
        data["_type"] = "view";
        super(data);
    }
}

class SpellHeader extends SpellObject {
    constructor(data) {
        data["_type"] = "header";
        super(data);
    }
}

class SpellNavBar extends SpellObject {
    constructor(data) {
        data["_type"] = "navbar";
        super(data);
        this._html_tag = "nav";
    }
}

class SpellForm extends SpellObject {
    constructor(data) {
        data["_type"] = "form";
        super(data);
        this._html_tag = "form";
    }
}


class SpellImage extends SpellObject {
    static get defaults() {
        return  {
            _type : "image",
        };
    }

    constructor(data) {
        data["_type"] = "image";
        super(data);
        this._html_tag = "img";
    }
}
class SpellVideo extends SpellObject {
    constructor(data) {
        data["_type"] = "video";
        super(data);
        this._html_tag = "video";

    }
}
class SpellTextField extends SpellObject {
    constructor(data) {
        data["_type"] = "text";
        super(data);
        this._html_tag = "input";
    }

    set_text(text)
    {
        this.text = text;
        this.jquery_object.val(text);
    }
}

class SpellLink extends SpellObject {
    static get  defaults()  {
        let oid = "link-" + SpellUtils.guid();
        let def = {
            _id: oid,
            name: oid,
            text: oid,
            style: "",
            class:"pai-link"
        }
        return def;
    }

    constructor(data) {
        data["_type"] = "link";
        super(data);
        this._html_tag = "a";
    }
}

class SpellLabel extends SpellObject {
    static get  defaults()  {
        let oid = "label-";
        let def = {
            _id: oid
        }
        return def;
    }

    constructor(data) {
        data["_type"] = "label";
        super(data);
        this._html_tag = "label";
    }

    set_text(text)
    {
        this.text = text;
        this.jquery_object.text(text);
    }
}

class SpellButton extends SpellObject {
    
    static get defaults() {
        return  {
            _type : "button",
            class:"pai-button"
        };
    }

    constructor(data) {
        if(!data) {data=SpellButton.defaults;}
        data["_type"] = SpellButton.defaults._type;
        super(data);
        this._html_tag = "button";
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


class SpellList extends SpellObject {
    constructor(data) {
        data["_type"] = "list";

        super(data);
        this._html_tag = "ul";
    }

    set_text(text)
    {
        this.text = text;
        this.jquery_object.val(text);
    }
}

class SpellGrid extends SpellObject {
    static get defaults() {
        return  {
            _type : "grid",
            class:"container-fluid",
            style:"margin-top: 50px;"
        };
    }
    
    constructor(data) {
        data["_type"] = "grid";
        data["_ignore"] = "rows";
        super(data);
        if(data.hasOwnProperty("rows"))
        {
            data.rows.forEach(row => {
                SpellUtils.merge_defaults_with_data(row,SpellGridRow.defaults);
                this.append(new SpellGridRow(row));
            })
        }
    }
}
class SpellGridCol extends SpellObject {
    static get defaults() {
        return  {
            _type : "grid-col",
            class:"col-sm spell-grid-col"
        };
    }
    constructor(data) {
        data["_type"] = "grid-col";
        super(data);
        if(data.hasOwnProperty("spells"))
            {
                //console.log();
                data.spells.forEach(spell => {
                    let spell_object = Spell.create(spell);
                    this.append(spell_object)
                });
            }
    }
}
class SpellGridRow extends SpellObject {
    static get defaults() {
        return  {
            _type : "grid-row",
            class:"row spell-grid-row",
        };
    }

    constructor(data) {
        data["_type"] = "grid-row";
        data["_ignore"] = "cols";
        super(data);
        if(data.hasOwnProperty("cols"))
        {
            data.cols.forEach(col => {
                SpellUtils.merge_defaults_with_data(col,SpellGridCol.defaults);
                this.append(new SpellGridCol(col));
            })
        }
    }
}

/******* Spell Table *******/
/**
 * _header : {
 *      _fields : ["field-1","field-2"...],
 *      style: "th"
 * }
 */
class SpellTable extends SpellObject {
    static get defaults() {
        return  {
            _type:"table",
            class:"pai-table",
            style:"margin-top: 50px;"
        };
    }
    
    constructor(data) {
        if(!data._type) {data._type = SpellTable.defaults._type;}
        super(data);
        this._html_tag = "table";
        if(data._header) {
            let tbr = new SpellTableRow();
            if(data._header._fields) {
                data._header._fields.forEach(field => tbr.append(new SpellTableHeader({"id":"eth"+field,"text":field})))
            }
            this.append(tbr)
        }
        if(data._data) {
            data._data.forEach(field => {
                    let tbr = new SpellTableRow();
                    Object.keys(field).forEach(cell => tbr.append(new SpellTableCell({"text":String(field[cell])})))
                    this.append(tbr)         
                })
        }
    }
}

class SpellTableRow extends SpellObject {
    static get defaults() {
        return  {
            _type:"table-row"
        };
    }
    
    constructor(data) {
        
        // full protection
        if(!data){
            data = SpellTableRow.defaults;
        }
        else if(!data._type) {
            data._type = SpellTableRow.defaults._type;
        }

        super(data);
        this._html_tag = "tr";
    }
}

class SpellTableCell extends SpellObject {
    static get defaults() {
        return  {
            _type:"table-cell"
        };
    }
    
    constructor(data) {
        // full protection
        if(!data){
            data = SpellTableCell.defaults;
        }
        else if(!data._type) {
            data._type = SpellTableCell.defaults._type;
        }
        super(data);
        this._html_tag = "td";
    }
}

class SpellTableHeader extends SpellObject {
    static get defaults() {
        return  {
            _type:"table-header"
        };
    }
    
    constructor(data) {
        if(!data._type) {
            data._type = SpellTableHeader.defaults._type;
        }
        super(data);
        this._html_tag = "th";
    }
}


/******* Spell Modal *******/

class SpellDialog extends SpellObject {
    
    
    constructor(data) {
        const defaults =  {
            _type:"dialog",
            class:"modal fade",
            "aria-hidden":"true",
            _header:{}, 
            _body:{},
            _footer:{},
        };         
        super(data,defaults);
        
        
        this.binded = false;

        let md = new SpellView({"_id":"spell-modal-dialog","class":"modal-dialog"});
        let mc = new SpellView({"_id":"spell-modal-content","class":"modal-content"});
        if(data._header){
            let dialog_header = new SpellDialogHeader(data._header)
            mc.append(dialog_header);
        }

        let modal_body = new SpellView({"_id":"spell-modal-body","class":"modal-body"});
        if(data._body._type){
            let internal_view = Spell.create(data._body)
            modal_body.append(internal_view)
        }

        mc.append(modal_body);

        if(data._footer._buttons) {
            let modal_footer = new SpellDialogFooter({"_id":"spell-modal-footer","_buttons":data._footer._buttons});
            mc.append(modal_footer)
        }
        
        md.append(mc)
        this.append(md);
        
        
    }

    bind(element) {
        $(element).append(this.get_html())
        this.binded = true;
        $("#"+this._id).on('hidden.bs.modal', function (e) {
            //TO-DO handle modal close event
            console.log("hiding modal")
          })
    }

    close() {
        $("#"+this._id).modal('hide')
        Spell.vm.active_modal=this._id;
    }

    show() {
        if(!this.binded) {this.bind(spell_element)}
        Spell.vm.active_modal=this._id;
        $("#"+this._id).modal('show')
    }
}

class SpellDialogHeader extends SpellObject {
    constructor(data) {
        const defaults={
            _type:"dialog-header",
            class:"modal-header"            
        };
        super(data,defaults);
        let h5 = new SpellView({"_id":"spell-modal-title","class":"modal-title","text":data.title,_html_tag : "h5"});
        let btn_modal_close = new SpellButton({"class":"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})
        this.append(h5);
        this.append(btn_modal_close);
    }
}

class SpellDialogFooter extends SpellObject {
    constructor(data) {
        const defaults={
            _type:"dialog-footer",
            _buttons:[], //Array of SpellButtons
            class:"modal-footer"            
        };
        super(data,defaults);
        data._buttons.forEach(button => {
            let btn_modal = new SpellButton(button);
            this.append(btn_modal);
        })
        
        
    }
}


class SpellAirCursor extends SpellObject {
    constructor(data) {
        const defaults={
            _type:"air-cursor",
            _buttons:[], //Array of SpellButtons
            class:"spell-air-cursor",
            "_html_tag": "img",
            _source:"air"            
        };
        super(data,defaults);
        
        if(this._source == "mouse") {
            document.body.onmousemove = (ev) => {
                const e = ev || window.event;
                const se = {x:ev.clientX,y:ev.clientY}
                this.air_move(se)
            }

            document.addEventListener("click", (ev)=> {
                const e = ev || window.event;
                const se = {x:ev.pageX,y:ev.pageY}
                this.air_click(se);
            });
        } 
        else if(this._source == "air") {
            document.addEventListener('air-move',(ev)=>{
                this.air_move(ev.detail)
            })
            
            document.addEventListener("air-click", (ev)=> {
                this.air_click(ev.detail);
            });
        }
    }

    async air_move(spell_event) {
        if(!this._jq_obj) {this._jq_obj = $("#" + this._id);}
        this._jq_obj.css({top:spell_event.y,left:spell_event.x})
    }

    async air_click(spell_event) {
        //if(!this._jq_obj) {this._jq_obj = $("#" + this._id);}
        //this._jq_obj.addClass("anim_air_click xyz-in")
        //console.log(spell_event.x + " : " + spell_event.y)
    }
}

Spell.Object_Manager.add_objects(
    {
        "view":SpellView,
        "label":SpellLabel,
        "link" :SpellLink,
        "button" :SpellButton,
        "text" : SpellTextField,
        "video" : SpellVideo,
        "image" : SpellImage,
        "grid" : SpellGrid,
        "list": SpellList,
        "form":SpellForm,
        "table":SpellTable,
        "air-cursor":SpellAirCursor
    }
)
