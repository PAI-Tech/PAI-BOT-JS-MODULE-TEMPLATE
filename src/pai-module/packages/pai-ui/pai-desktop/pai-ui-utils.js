



function pai_print_val(v)
{
    if(v && v != null && v != "null")
        return v;
    else
        return "";
}




/**
 * inViewport jQuery plugin by Roko C.B.
 * http://stackoverflow.com/a/26831113/383904
 * Returns a callback function with an argument holding
 * the current amount of px an element is visible in viewport
 * (The min returned value is 0 (element outside of viewport)
 */

(function($, win) {
    $.fn.inViewport = function(cb) {
        return this.each(function(i,el){
            function visPx(){
                var elH = $(el).outerHeight(),
                    H = $(win).height(),
                    r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
                return cb.call(el, Math.max(0, t>0? Math.min(elH, H-t) : Math.min(b, H)));
            } visPx();
            $(win).on("resize scroll", visPx);
        });
    };
}(jQuery, window));


function pai_encode_message(msg)
{
    return btoa(encodeURIComponent(msg));
}

function pai_decode_message(msg)
{
    return decodeURIComponent(atob(msg));
}

function pai_get_date(UNIXTimestamp) {

    let str  = UNIXTimestamp.toString();
    UNIXTimestamp = str.substring(0, str.length - 3);

    let theDate = new Date(UNIXTimestamp * 1000);
    //let  dateString = theDate.toUTCString();

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(theDate);

}