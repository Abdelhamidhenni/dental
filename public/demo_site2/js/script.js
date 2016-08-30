$(document).ready(function(){
    /* =================================
     NAVBAR
     =================================== */
    jQuery(window).scroll(function () {
        var top = jQuery(document).scrollTop();
        var batas = jQuery(window).height();

        if ( top > batas ) {
            jQuery('.navbar-main').addClass('stiky');
        }else {
            jQuery('.navbar-main').removeClass('stiky');
        }
    });
});