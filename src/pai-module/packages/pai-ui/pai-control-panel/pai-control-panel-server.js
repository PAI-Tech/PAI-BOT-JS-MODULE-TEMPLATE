/*
 Module       : PAI-UI-KIT
 File         : pai-desktop-server
 Description  : Server side implementation
 Author       : Tamir Fridman
 Date Created : 19/11/2018
 Copyright PAI-TECH 2018, all right reserved
  */


//const pai_utils = require('@pai-tech/pai-code').PAIUtils;



const PAIUIBasePackage  = require('../pai-ui-base-package');





class PAIControlPanel extends PAIUIBasePackage {


    constructor() {
        super();

        this.package_name = 'pai-ui/pai-control-panel';
        this.package_files = [
            {"file-name": "pai-control-panel.css", "type": "stylesheet"},
            {"file-name": "pai-control-panel.js", "type": "script"},
        ];
    }

    get_control_panel_button(num,button)
    {


        let res = `<div id='control-panel-item-${num}' class='control-panel-item' onclick='${button.onclick}'>
		    		<div class='control-panel-item-icon'>
                        <img id='control-panel-item-${num}-img' src='${button.image}'/>
                    </div>
                    <div id='control-panel-item-${num}-txt' class='control-panel-item-text'>${button.text}</div>
		    	</div>`;
        return res;
    }

    get_control_panel(panel_data)
    {

        return `<div id='pai-cp-${panel_data.id}' class="control-panel" style='${panel_data.style}'>` +
            this.get_control_panel_button(1,panel_data.buttons.button_1) +
            this.get_control_panel_button(2,panel_data.buttons.button_2) +
            this.get_control_panel_button(3,panel_data.buttons.button_3) +
            this.get_control_panel_button(4,panel_data.buttons.button_4) +
            `</div>`;
    }

    parse(key,data,html_out)
    {
        html_out.start_html += this.get_control_panel(data);
    }
}


module.exports = PAIControlPanel;