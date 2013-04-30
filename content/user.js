function loadScoreData() {
  var url  = 'http://p.eagate.573.jp/game/2dx/20/p/djdata/music.html';
  var url2 = 'http://p.eagate.573.jp/game/2dx/20/p/djdata/music_info.html?index=1';
  var data = {
    list: 0,
    s: 2,
    page: 1
  };

  getAndCallBack(url, data, function(responseText) {
    logger(responseText);
  });
}
