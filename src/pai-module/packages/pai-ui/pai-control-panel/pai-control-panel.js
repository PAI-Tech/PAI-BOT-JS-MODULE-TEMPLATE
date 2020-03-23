
function togglePause()
{
    event.stopPropagation();
    if(!isPlaying)
    {
        _player.play();
        $("#control-panel-item-2").fadeTo("slow",0.2, function() {
            $(this).fadeTo("slow",1);
            $("#cp-play-img").attr("src","images/player-pause.png");
            $("#cp-play-txt").text("Pause");
        });
    }
    else
    {
        _player.pause();
        $("#control-panel-item-2").fadeTo("slow",0.2, function() {
            $(this).fadeTo("slow",1);
            $("#cp-play-img").attr("src","images/player/player-play.png");
            $("#cp-play-txt").text("Play");
        });

    }
    isPlaying = !isPlaying;
}

function toggleMute()
{
    event.stopPropagation();

    if(isMute)
    {
        _player.volume = 1;
        _player.muted = false;
        $("#control-panel-item-3").fadeTo("slow",0.2, function() {
            $(this).fadeTo("slow",1);
            $("#cp-mute-img").attr("src","images/player/player-mute.png");
            $("#cp-mute-txt").text("Mute");
        });
    }
    else
    {
        _player.volume = 0;
        _player.muted = true;
        $("#control-panel-item-3").fadeTo("slow",0.2, function() {
            $(this).fadeTo("slow",1);
            $("#cp-mute-img").attr("src","images/player/player-unmute.png");
            $("#cp-mute-txt").text("Unmute");
        });

    }
    isMute = !isMute;

}


function toggleLive()
{
    event.stopPropagation();

    if(isPlaying)
    {
        togglePause();
    }
    window.open(wwwLink, "_blank");
}


function toggleBuy()
{
    event.stopPropagation();

    if(isPlaying)
    {
        togglePause();
    }
    window.open(buyLink, "_blank");
}