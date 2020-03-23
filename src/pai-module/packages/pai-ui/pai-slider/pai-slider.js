




class PAI_SLIDER {
    constructor(data,parent) {
        this.id = data.id;
        this.name = data.id;
        this.title = "";
        this.style = "";
        this.css_class = "";
        if(parent) {
            $("#" + parent).append(this.get_html());
            this.parse(data);

        }
    }





    get_html_object() {
        return document.getElementById(this.id);
    }


    empty()
    {

        this.get_html_object().empty();
    }

    slider_cell_click()
    {

    }

    add_cell(cell)
    {

        let cell_id = "slider-cell-" + cell["cell-id"] ;
        let on_click_ref = (cell.hasOwnProperty("onclick")) ? cell.onclick  : " console.log(':/ unclickable cell')";

        let new_cell_html = '<div title="' + cell["title"] + '" id="' + cell_id + '" class="swiper-slide" onclick="' + on_click_ref + '"><img class="slider-element-image" src="' + cell.thumb + '"></div>';
        $("#" + this.id).append(new_cell_html);

    }

    parse(pai_slider_data)
    {
        if (pai_slider_data.hasOwnProperty("style")) {
            this.style = pai_slider_data["style"];
        }
        if (pai_slider_data.hasOwnProperty("title")) {
            this.title = pai_slider_data["title"];
        }
        if (pai_slider_data.hasOwnProperty("class")) {
            this.css_class = pai_slider_data["class"];
        }

        init_swiper();
        if(pai_slider_data.hasOwnProperty("cells"))
        {
            for(let cell in pai_slider_data.cells)
            {
                this.add_cell(pai_slider_data.cells[cell]);
            }
        }
    }



    get_html()
    {

        let html_out =  `<div id='${this.id}-slider-wrapper' class="swiper-container ${this.css_class}" style="${this.style}">
		        <div class="swiper-wrapper" id='${this.id}'></div>
		        <div class="swiper-scrollbar"></div></div>`;
       return html_out;
    }



}

function init_swiper()
{
    swiper = new Swiper('.swiper-container', {
        scrollbar: '.swiper-scrollbar',
        scrollbarHide: true,
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 20,
        grabCursor: true,
        slidesOffsetBefore:10
    });
}

var pai_sliders = {"player-name":null};


function pai_slider_get(name)
{
    let slider = (pai_sliders.hasOwnProperty(name)) ? pai_sliders[name] : null;
    return slider;
}


function pai_slider_add(parent,pai_data)
{
    let data = JSON.parse(pai_data);
    let name = data.id;
    let slider = new PAI_SLIDER(data,parent);
    pai_sliders[name] = slider;
}


