/*

    PAI UI Client
 */




class PAI_UIC {

    constructor() {
        this.pai_ui_objects =
            {
                "pai-page-title" : (data) => `<div><h3>${data.title}</h3></div>`,
                "pai-input-field" : (data) => pai_ui.get_input_field(data),
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