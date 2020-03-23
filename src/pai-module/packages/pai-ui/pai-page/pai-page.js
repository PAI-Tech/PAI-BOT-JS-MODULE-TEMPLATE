/*
    PAI UI KIT
     <New Page Template> Page
     Description  : Client based UI kit
     Author       : Tamir Fridman
     Date Created : 19/11/2018
     Copyright PAI-TECH 2018, all right reserved
 */



class PAI_HOME_PAGE
{
    constructor()
    {
        this.id = pai_utils_pai_guid();
        this.html_object =  null;
        this.style = "";
        this.css_class = "pai-home-page";
        this.title = "PAI";
    }


    async parse(data)
    {

        //this.groupMemberArray =  await getGroupMember();
        //await getAllPages();
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







    get_html(data)
    {

        let ztag = ` <div>PAI MODULE BUILDER - Please fill</div><hr/>
        <form name="frm-new-module" action="create" method="post">
                    <div>Module Name</div><div><input type="text" name="pai-module-name" value="my-module"/></div>
                    <div>Author</div><div><input type="text" name="pai-module-author" value="Tamir Fridman"/></div>
                    <div>Company</div><div><input type="text" name="pai-module-company-name" value="PAI-TECH"/></div>
                    <div>Description</div><div><input type="text" name="pai-module-desc" value="my first module"/></div>
                    <div><input type="submit" value="create"/></div>
</form>`;
        return ztag;
    }

}


//Singletone
var pai_home_page__page = null;


function pai_page_get(parent,pai_data)
{
    if(!pai_home_page__page)
    {
        pai_home_page__page = new PAI_HOME_PAGE();
        let i_data = JSON.parse(pai_data);
        pai_home_page__page.parse(i_data);
        $("#" + parent).append(pai_home_page__page.get_html(i_data));

        // Example for catch Enter key
        // $(document).on('keypress',function(e) {
        //     if(e.which == 13) {
        //         on-enter-function();
        //     }
        // });

    }
    return pai_home_page__page;
}


