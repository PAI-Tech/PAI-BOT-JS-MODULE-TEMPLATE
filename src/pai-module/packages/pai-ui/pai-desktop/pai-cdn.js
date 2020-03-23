

class PAI_CDN
{

    constructor()
    {

    }

    static upload(inputId) {

        return new Promise(async (resolve, reject) => {
            let cdnUrl = pai_desktop_get_param('pai-cdn') + "/add-file";

            let file_data = $('#' + inputId).prop('files')[0];
            let form_data = new FormData();
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
    }
}
