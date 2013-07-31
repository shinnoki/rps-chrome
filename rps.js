var load;

$(function() {
  $('<input id="btn-rps" type="button" value="RPSにスコアを送信" />').prependTo($(document.body));
  $('#btn-rps').click(function() {
    load = Array(7);
    var i;
    for (i = 0; i < 7; ++i) {
      load[i] = false;
    }
    $('<p id="label-rps">読込中...しばらくお待ちください</p>').prependTo($(document.body));
    createUser();
  });
});
