/*
    PAI UI KIT
    PAI-Window
     Description  : Client based UI kit
     Author       : Tamir Fridman
     Date Created : 19/11/2018
     Copyright PAI-TECH 2018, all right reserved
 */


class PAI_WINDOW
{
    constructor()
    {
        this.id = pai_utils_pai_guid();
        this.name = name;
        this.html_object =  null;
        this.icon = null;
        this.style = "";
        this.css_class = "pai-window";
        this.title = "New Window";
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
        if (data.hasOwnProperty("icon")) {
            this.icon = data["icon"];
        }

    }

    get_html()
    {
        let ztag = `<div id ="` + this.id + `" class = "flip-in-ver-right  ` + this.css_class + `">
                <div class="pai-window-title" >
					<div name="window-title-icon" style="margin-top:12px;margin-left:12px;width:25px"><img src="` + this.icon + `" style="width:20px"/> </div>
					<div name="window-title-text" style="margin-top:12px;width:145px;color:white">` + this.title + `</div>
				</div>
				<div name="pai-window-content" style="position: absolute;top:113px;height:90%;width:100%;border: 1px solid #e9e9e9;">
					<table style="width:100%;background-color: #fefefe;border:1px solid #cccccc;border-collapse:separate; border-spacing:10px;">
						<tr style="">
							<th>Month of visit</th>
							<th>Initial meeting</th>
							<th>Qualification</th>
							<th>POC/Pilot</th>
							<th>Production</th>
						</tr>
						<tr style="text-align: center;bottom: 10px;">
							<td>January 2018</td>
							<td></td>
							<td></td>
							<td></td>
							<td>PAI-TECH</td>
						</tr>
					</table>

				</div>
         </div>`;
        return  ztag;

    }

}

var pai_windows = {"window-name":null};


function pai_image_get(name)
{
    let image = (pai_images.hasOwnProperty(name)) ? pai_images[name] : null;

    return image;
}

function pai_window_add(parent,pai_data)
{
    let i_data = JSON.parse(pai_data);
    let obj = new PAI_WINDOW();
    pai_windows[name] = obj;
    obj.parse(i_data);
    $("#" + parent).append(obj.get_html());

}
