/*
Easy Admin is positioned relatively

This script is included when either admin menu or toolbar is also present, 
in order to  set the top-margin according to height of admin menu (which depends
on the screen width, so it is dynamic)

*/


(function($) {


function setTopMargin(hasAdminMenu) {
  var height;
  if (hasAdminMenu) {
    height = $('#admin-menu').height();
  }
  else {
    height = $('#toolbar').height();
  }
  if (height) {
    $('.easy-admin').css('margin-top', height + 'px');
  }
}

function adminMenuReady() {
  $('#admin-menu').find('.shortcut-toggle').click(function () {
    setTopMargin(true);
  });
  setTopMargin(true);
}

Drupal.behaviors.easyadmin = {
  attach: function (context, settings) {

//    $('body').addClass('easy-admin-fixed');

    var hasAdminMenu = settings['easy_admin']['has_admin_menu'];
    if (hasAdminMenu) {
      var $adminMenu = $('#admin-menu');
      if ($adminMenu.length == 0) {
        // Admin menu is going to be fetched from cache
        // when this has been done, admin menu triggers a window.resize
        $(window).bind('resize.easyadmin', adminMenuReady);
      }
      else {
        adminMenuReady();
      }
    }
    else {
      setTopMargin(false);
    }      


  }
};


})(jQuery);
