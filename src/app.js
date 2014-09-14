(function(window, $) {
  "use strict";


  window.crypton.host = 'encryptr.org';
  window.crypton.port = '443';
  window.Offline.options = {
    // Should we check the connection status immediatly on page load.
    checkOnLoad: false,

    // Should we monitor AJAX requests to help decide if we have a connection.
    interceptRequests: true,

    // Should we automatically retest periodically when the connection is down (set to false to disable).
    reconnect: {
      // How many seconds should we wait before rechecking.
      initialDelay: 3
    },

    // Should we store and attempt to remake requests which fail while the connection is down.
    requests: true,

    // What the xhr checks
    checks: {
      xhr: {
        //url: ("https://" +
          //window.crypton.host +
          //(window.crypton.port ? (":" + window.crypton.port) : "") +
          //"/")
        url: "https://encryptr.org/favicon.ico"
      }
    }
  };
  window.Offline.on('down', function() {
    $('.fab').addClass('offline');
  });
  window.Offline.on('up', function() {
    window.setTimeout(function() {
      $('.fab').removeClass('offline');
    }, 2300);
  });
  // @TODO make this more generic
  $('a').on('touchstart', function(e) {
    $(this).closest('.button').addClass('active');
  });
  $('a').on('touchend', function(e) {
    $(this).closest('.button').removeClass('active');
  });
})(window, window.jQuery);
