/*
    PAI UI KIT
     <New Page Template> Page
     Description  : Client based UI kit
     Author       : Tamir Fridman
     Date Created : 19/11/2018
     Copyright PAI-TECH 2018, all right reserved
 */



class PAI_PAGE
{
    constructor()
    {
        this.id = pai_utils_pai_guid();
        this.html_object =  null;
        this.style = "";
        this.css_class = "pai-page";
        this.title = "PAI";
    }


    async parse(data)
    {

        if (data.hasOwnProperty("style")) {
            this.style = data["style"];
        }
        if (data.hasOwnProperty("class")) {
            this.css_class = data["class"];
        }
        if (data.hasOwnProperty("id")) {
            this.id = data["id"];
        }

    }







    get_html()
    {

        let ztag = ` <div>PAI PAGE</div>`;
        return ztag;
    }

}


//Singletone
var pai_page__page = null;


function pai_page_get(parent,pai_data)
{
    if(!pai_page__page)
    {
        pai_page__page = new PAI_PAGE();
        let i_data = JSON.parse(pai_data);
        pai_page__page.parse(i_data);
        $("#" + parent).append(pai_page__page.get_html());

        // Example for catch Enter key
        // $(document).on('keypress',function(e) {
        //     if(e.which == 13) {
        //         on-enter-function();
        //     }
        // });

    }
    return pai_page__page;
}


