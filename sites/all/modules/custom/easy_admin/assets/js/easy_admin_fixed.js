

(function($) {

function engulfToolbars() {
  $('body').addClass('easy-admin-engulfing');

  var $adminMenu = $('#admin-menu');

  var hasToolbar = ($('.toolbar-menu').length == 1);

  if (($adminMenu.length == 1) || (hasToolbar)) {
    $('body').append('<div id="easy_admin_engulfing_other_toolbars"></div>');

    if ($adminMenu.length == 1) {
      $adminMenu.appendTo("#easy_admin_engulfing_other_toolbars");
      $adminMenu.css('position', 'relative'); // override the css attribute set in admin_menu.js

      var $toggle = $adminMenu.find('.shortcut-toggle');
      $toggle.click(function () {
        setTopMargin();
      });
    }

    if (hasToolbar) {
      var $toolbar = $('#toolbar');
      $toolbar.appendTo("#easy_admin_engulfing_other_toolbars");
      $toolbar.css('position', 'relative');
    }

    $(".easy-admin").appendTo("#easy_admin_engulfing_other_toolbars");

    $(window).bind('resize.easyadmin', function() {
      setTopMargin();
    });

    setTopMargin();
  }
}

function setTopMargin() {
  var height = $('#easy_admin_engulfing_other_toolbars').height();
  $('html').css('padding-top', height + 'px');
  // We don't set it on body element, because it is already used
  // by toolbar and admin menu. It is simpler to "undeclare" these in css

}


Drupal.behaviors.easyadmin = {
  attach: function (context, settings) {

    $('body').addClass('easy-admin-fixed');
    
    var hasAdminMenu = settings['easy_admin']['has_admin_menu'];
    if (hasAdminMenu) {
      var $adminMenu = $('#admin-menu');
      if ($adminMenu.length == 0) {
        // Admin menu is going to be fetched from cache
        // when this has been done, admin menu triggers a window.resize
        $(window).bind('resize.easyadmin', function() {
          $(window).unbind('resize.easyadmin');
          engulfToolbars();
        });
      }
      else {
        engulfToolbars();
      }
    }
    else {
      var hasToolbar = ($('.toolbar-menu').length == 1);
      if (hasToolbar) {
        engulfToolbars();
      }
    }

  }
};


})(jQuery);
