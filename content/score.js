function loadScoreData() {
  logger("Start loading");
  startLoading(0);
}

// load score with index
function loadScore(index) {
  var url = 'http://p.eagate.573.jp/game/2dx/20/p/djdata/music_info.html';
  var data = {
    index: index
  };
  getAndCallBack(url, data, function(responseText) {
    responseText.match(/<th scope="row">楽曲名<\/th>.+?<td class="music_info_td">\s+?([^\s].*?)<br \/>/);
    var title = RegExp.$1;
    logger("title:" + title);

    responseText.match(/<h4>SP<\/h4>.+?<tr>.+?<\/tr>.+?<tr>.+?clflg(.).+?clflg(.).+?clflg(.).+?<\/tr>.+?<tr>.+?<\/tr>.+?<tr>.+?<td.+?>(.+?)\(.+?<td.+?>(.+?)\(.+?<td.+?>(.+?)\(.+?<\/tr>.+?<tr>.+?<td.+?>(.+?)<.+?<td.+?>(.+?)<.+?<td.+?>(.+?)<.+?<\/tr>/);

    var clear_lamp = Array(3);
    clear_lamp[0] = RegExp.$1;
    clear_lamp[1] = RegExp.$2;
    clear_lamp[2] = RegExp.$3;
    logger("lamp:" + clear_lamp[0] + "," + clear_lamp[1] + "," + clear_lamp[2]);

    var score = Array(3);
    score[0] = RegExp.$4;
    score[1] = RegExp.$5;
    score[2] = RegExp.$6;
    logger("score:" + score[0] + "," + score[1] + "," + score[2]);

    var bp = Array(3);
    bp[0] = RegExp.$7;
    bp[1] = RegExp.$8;
    bp[2] = RegExp.$9;
    logger("bp:" + bp[0] + "," + bp[1] + "," + bp[2]);
  });
}

// start loading with alphabet search order: 0(ABCD) ~ 6(OTHERS)
function startLoading(order) {
  var url  = 'http://p.eagate.573.jp/game/2dx/20/p/djdata/music.html';
  var data = {
    list: order,
    s: 2,
    page: 1
  };
  getAndCallBack(url, data, function() {
    loadScore(2);
  });
}
