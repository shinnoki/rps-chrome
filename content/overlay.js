(function() {
  jQuery.noConflict();
  $ = function(selector, context) {
    return new jQuery.fn.init(selector, context || rps.doc);
  };
  $.fn = $.prototype = jQuery.fn;

  rps = new function() {};
  rps.run = function(doc, aEvent) {
    // Check for website
    if (!doc.location.href.match(/^http:\/\/p\.eagate\.573\.jp(\/.*)?$/i))
      return;

    // Check if already loaded
    if (doc.getElementById("btn-rps")) return;

    // Setup
    this.doc = doc;

    // Add button
    $('<input id="btn-rps" type="button" value="RPSにスコアを送信" />').prependTo(doc.body);
    $('#btn-rps').click(function() {
      load = Array(7);
      var i;
      for (i = 0; i < 7; i = i + 1) {
        load[i] = false;
      }
      $('<p id="label-rps">読込中…しばらくお待ち下さい</p>').prependTo(doc.body);
      createUser();
    });
  };

  // Bind Plugin
  var delay = function(aEvent) {
    var doc = aEvent.originalTarget; setTimeout(function() {
      rps.run(doc, aEvent);
    }, 1);
  };
  var load = function() {
    gBrowser.addEventListener("DOMContentLoaded", delay, true);
  };
  window.addEventListener("pageshow", load, false);
})();
