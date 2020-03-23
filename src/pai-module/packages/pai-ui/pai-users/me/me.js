/*
    PAI UI KIT
     Search page
     Description  : Client based UI kit
     Author       : Tamir Fridman
     Date Created : 19/11/2018
     Copyright PAI-TECH 2018, all right reserved
 */


class ME
{
    constructor()
    {
        this.id = pai_utils_pai_guid();
        this.html_object =  null;
        this.style = "";
        this.css_class = "me";
        this.title = "Me";
        this.me_val = null;
    }


    parse(data)
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






    get_field(label,name,value,type)
    {
        let ptype = (type) ? type : "text";
        let out = `<div style="display:flex;margin-top:10px"><div>${label}</div><div style="margin-left: 10px"><input type="${ptype}" name="${name}" id="${name}" value="${value}"/></div></div>`;
        return out;
    }

    get_label(label,value)
    {
        let out = `<div style="display:flex;margin-top:10px"><div>${label}</div><div style="margin-left: 10px">${value}</div></div>`;
        return out;
    }


    get_html()
    {


        let ztag = `<div id ="` + this.id + `" class = "` + this.css_class + `">
                        <div id="search-upper" class="row">
                            <div id="search-upper-text" >My Profile</div>
                        </div>
                        <div id="pai-me-panel" style="display: block">` +
                        `<div>
                        <input type="file" style="position: absolute;opacity: 0;width: 100px;height: 100px;cursor: pointer;" id="imgInp" onchange=" readURL(this);">
                        <img id="user_profile_pic" src="${this.me_val.profileImage}" style="width: 100px;height: 100px"/></div>` +
                        this.get_label("Email",this.me_val.email) +
                        this.get_field("First Name","first-name",this.me_val.firstName) +
                        this.get_field("Last Name","last-name",this.me_val.lastName) +
                    ` <div style="display: flex;margin-top: 20px">
                            <div class="me-button" onclick="pai_change_pwd(false)">Change Password</div>
                            <div class="me-button" onclick="pai_save_me()">Save</div>
                        </div></div>
                       
                        
                        <div id="pai-cp-panel" style="display: none;margin-top: 20px">` +
                            this.get_field("Current Password","pai-curr-pwd","","password") +
                            this.get_field("New Password","pai-new-pwd","","password") +
                            this.get_field("Verify Password","pai-ver-pwd","","password") +

                        `<div  style="display: flex;margin-top: 20px">
                            <div class="me-button" onclick="pai_cancel_pwd()">Cancel</div>
                            <div class="me-button" onclick="pai_change_pwd(true)">Change Password</div>
                        </div></div>
                        
                        
                        </div>`;
        return ztag;
    }

}


//Singletone
var me_page = null;


function me_get(parent,pai_data)
{
    let lme = localStorage.getItem("pai-me");
    if(lme)
    {
        if(!me_page)
        {

            me_page = new ME();
            let i_data = JSON.parse(pai_data);
            me_page.parse(i_data);

            me_page.me_val = JSON.parse(lme);
            $("#" + parent).append(me_page.get_html());


            $(document).on('keypress',function(e) {
                if(e.which == 13) {
                    pai_search();
                }
            });

        }
        return me_page;
    }
    else
    {
        document.location = "login";
    }
}


async function pai_save_me() {


    let logo ='';
    if ($('#imgInp').get(0).files.length === 0) {
        console.log("No files selected.");
    }
    else
    {
        logo  = await uploadMedia('imgInp');
    }

    let me = JSON.parse(localStorage.getItem('pai-me'))._id;
    let firstName = $('#first-name').val();
    let lastName = $('#last-name').val();

    let paiCodeStatment =`pai-auth update-user _id:"${me}" firstName:"${firstName}" lastName:"${lastName}"`;

    let profileImage = '';
    if(logo.file_name)
    {
        profileImage = pai_desktop_get_param('pai-cdn') + `/get-file?cdn-key=${logo["cdn-key"]}`;
        paiCodeStatment =paiCodeStatment+` profileImage:"${profileImage}"`;
    }


    return new Promise((resolve, reject) => {
        $.ajax({
            url: pai_desktop_get_param('bank-bot-url'),
            type: 'POST',
            data:paiCodeStatment
        }).done(function (data) {
            let meObject = JSON.parse(localStorage.getItem('pai-me'));
            meObject.firstName = firstName;
            meObject.lastName = lastName;
            if(profileImage.length)
            {
                meObject.profileImage = profileImage;
            }
            localStorage.setItem('pai-me',JSON.stringify(meObject));
            alert('successfully update');
        }).error(function (data) {
            if (data.status == 401) {
                return reject(new Error(data));
            }
        });

    });
}


function pai_change_pwd(v)
{
    if(v)
    {
        let curr_pwd = $("#pai-curr-pwd").val();
        let new_pwd = $("#pai-new-pwd").val();
        let ver_pwd = $("#pai-ver-pwd").val();
        if( (curr_pwd && curr_pwd.length>0) &&
            (new_pwd && new_pwd.length>0) &&
            (ver_pwd && ver_pwd.length>0))
        {
            if((ver_pwd === new_pwd))
            {
                updatePassword(new_pwd,curr_pwd);
            }
            else
            {
                alert("New password and Verify password fields are different");
            }
        }
    }

    else
    {
        $("#pai-me-panel").hide();
        $("#pai-cp-panel").show();
    }
}

function pai_cancel_pwd()
{
    $("#pai-me-panel").show();
    $("#pai-cp-panel").hide();
}

function updatePassword(newPass, currPass)
{
    let me = JSON.parse(localStorage.getItem('pai-me'))._id;

    let url =  pai_desktop_get_param('bank-bot-url') + `/pai-auth/users/updatePassword/${me}`;


    $.ajax({
        url: url,
        headers: {
            'Authorization':'Bearer '+localStorage.getItem('pai-token'),
            'Content-Type':'application/json'
        },
        type: 'POST',
        dataType: "json",
        data: JSON.stringify({
            "currentPassword": currPass.toString(),
            "newPassword":newPass.toString(),
            "userId":me
        })
    }).done(function (data) {
        alert(data);
    }).error(function (data) {
        if (data.status == 200) {
            alert('password changed');
            pai_cancel_pwd();
        }
        if (data.status == 400) {
            alert('data.status == 400');
        }
    });

}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#user_profile_pic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function uploadMedia(inputId) {

    return new Promise(async (resolve, reject) => {
        let cdnUrl = pai_desktop_get_param('pai-cdn') + "/add-file";

        var file_data = $('#' + inputId).prop('files')[0];
        var form_data = new FormData();
        form_data.append('pai_file', file_data);

        $.ajax({
            url: cdnUrl,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            // headers: {
            //     "Authorization": "Bearer " + (localStorage.getItem('access_token'))
            // },
            type: 'post',
            success: function (response) {
                return resolve( response);
            },
            error: function (error) {
                return reject( error);
            }
        });
    });
//    {"file_name":"WhatsApp Image 2019-02-03 at 10.06.16 (1).jpeg","cdn-key":"4b5769d9-98fe-4bbf-9ede-fd14cd40301b","mime_type":"image/jpeg"}
}