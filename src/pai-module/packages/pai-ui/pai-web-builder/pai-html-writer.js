/*
 PAI HTML Writer
 Author       : Tamir Fridman
 Date Created : 13/12/2018
 Copyright PAI-TECH 2018, all right reserved

 This is the web builder part of the bot!
 now the bot can create web page


 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */


class PAI_HTML_WRITER {

    constructor() {

    }

    static get_html_header(metadata, includes) {
        let head_out = `<head><title>${metadata["page-title"]}</title>
        <script src="public/js/jquery-2.0.0.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="https://kit.fontawesome.com/28c96941e4.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<link rel="shortcut icon" type="image/png" href="${metadata.icon}"/>
		<meta name="keywords" content="${metadata.keywords}">
		<meta name="author" content="${metadata.author}">
		<meta name="generator" content="PAI-BOT" /> 
		<meta content="${metadata["page-title"]}" name="title">
		<meta content="${metadata.description}" name="description">
		<meta content="${this.web_site_url}" property="og:site_name">
		<meta content="${metadata["page-title"]}" property="og:title">
		<meta content="${metadata.icon}" property="og:image">
		<meta content="${metadata.description}" property="og:description">
		
		<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"> 
		

        ${includes}</head>`;

        return head_out;
    }

    static start_tag(tag_name, id, css_class, style) {
        let res = `<${tag_name}`;
        if (id) {
            res += ` id="${id}"`;
        }
        if (style) {
            res += ` style="${style}"`;
        }
        if (css_class) {
            res += ` class="${css_class}"`;
        }
        res += ">";
        return res;
    }


    static close_tag(tag_name) {
        return `</${tag_name}>`;
    }

    static get_image_tag(id, src, alt, css_class, style) {
        let img = `<img id=${id} src="${src}"`;

        if (id) {
            img += ` id="${id}"`;
        }
        if (style) {
            img += ` style="${style}"`;
        }
        if (css_class) {
            img += ` class="${css_class}"`;
        }

        if (alt) {
            img += ` alt="${alt}" title="${alt}"`;
        }

        img += " />";
        return img;
    }


    static build_tag(tag_name, id, css_class, style, onclick_func) {
        let start_tag_attributes = "";

        if (id) {
            start_tag_attributes += ` id="${id}"`;
        }
        if (style) {
            start_tag_attributes += ` style="${style}"`;
        }
        if (css_class) {
            start_tag_attributes += ` class="${css_class}"`;
        }
        if (onclick_func) {
            start_tag_attributes += ` onclick="${onclick_func}"`;
        }

        let res_obj = {
            start_tag: `<${tag_name + start_tag_attributes}>`,
            end_tag: `</${tag_name}>`
        };
        return res_obj;
    }


}

module.exports = PAI_HTML_WRITER;
