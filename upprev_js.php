function getScrollY() {
    scrOfY = 0;
    if( typeof( window.pageYOffset ) == "number" ) {
        scrOfY = window.pageYOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        scrOfY = document.body.scrollTop;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        scrOfY = document.documentElement.scrollTop;
    }
    return scrOfY;
}

jQuery(function($){
    var upprev_closed = false;
    var upprev_hidden = true;
    $(window).scroll(function() {
        var lastScreen;
        if ($("#comments").length > 0)
            lastScreen = getScrollY() + $(window).height() < $("#comments").offset().top * 0.8 ? false : true;
        else
            lastScreen = getScrollY() + $(window).height() < $(document).height() * 0.8 ? false : true;
        if (lastScreen && !upprev_closed) {
            $("#upprev_box").stop().animate({right:"0px"});
            upprev_hidden = false;
        }
        else if (upprev_closed && getScrollY() == 0) {
            upprev_closed = false;
        }
        else if (!upprev_hidden) {
            upprev_hidden = true;
            $("#upprev_box").stop().animate({right:"-400px"});
        }
    });
    $("#upprev_close").click(function() {
        $("#upprev_box").stop().animate({right:"-400px"});
        upprev_closed = true;
        upprev_hidden = true;
    });
});