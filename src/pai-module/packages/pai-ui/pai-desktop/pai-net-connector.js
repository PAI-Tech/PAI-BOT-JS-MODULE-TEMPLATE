


class PAI_NET {

    constructor() {
    }

    static send_message(bot,pai_code)
    {

    }



    static async abot(u_name,u_pwd)
    {
        return new Promise(async (resolve, reject) => {
            $.ajax({
                url: pai_desktop_get_param('bank-bot-url') + "/pai-auth/oauth/token",
                type: 'POST',
                data: { client_id: "8cadb2c876abe988f1979b1a5a9e601818c94915", client_secret : "a04fd9cd28c813cca8bd346bf8a80ee23dae3aac",username:u_name,password:u_pwd,grant_type: "password"} ,
                contentType: 'application/x-www-form-urlencoded'
            }).done(function (data) {
                PAI_LDB.set_object("pai-token",data.access_token);
                return resolve();

            }).error(function (data) {
                if (data.status == 401) {
                    return reject(new Error(data));
                }
            });
        });
    }
}


    function pai_net_connect_bot(bot_name,pai_code_message,callback)
{
    return $.ajax({
        url: pai_desktop_get_param(bot_name),
        type: 'POST',
        data: pai_code_message
    })
}

