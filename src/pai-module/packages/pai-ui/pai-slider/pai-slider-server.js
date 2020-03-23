/*
 Module       : PAI-UI-KIT
 File         : pai-slider
 Description  : Server side implementation
 Author       : Tamir Fridman
 Date Created : 19/11/2018
 Copyright PAI-TECH 2018, all right reserved
  */


const pai_utils = require('@pai-tech/pai-code').PAIUtils;



const PAIUIBasePackage  = require('../pai-ui-base-package');





class PAISlider extends PAIUIBasePackage {


    constructor() {
        super();

        this.package_name = 'pai-ui/pai-slider';
        this.package_files = [
            {"file-name": "swiper.min.css", "type": "stylesheet"},
            {"file-name": "swiper.min.js", "type": "script"},
            {"file-name": "swiper.jquery.min.js", "type": "script"},
            {"file-name": "swiper.jquery.umd.min.js", "type": "script"},
            {"file-name": "pai-slider.js", "type": "script"},
            {"file-name": "pai-slider.css", "type": "stylesheet"},
        ];
    }

    get_pai_slider_js(slider_data)
    {

        let sd = JSON.stringify(slider_data);

        return "var pai_slider_data = `" + sd + "`;pai_slider_add(\"pai-desktop\",pai_slider_data);\n" ;


    }


    /*
       pai-slider
       --------------
       id
       class (css class)
       style (css style)
       text (inner text)
    */
    parse(key,data,html_out)
    {
        //html_out.start_html += this.get_pai_slider(data);
        html_out.main_func_js.push(this.get_pai_slider_js(data))
    }
}


module.exports = PAISlider;