var load;

function loadAllScoreData(iidxid) {
  logger("Start loading");
  startLoading(iidxid, 0);
}

// load score with index
function loadScore(iidxid, order, index) {
  var url = 'http://p.eagate.573.jp/game/2dx/20/p/djdata/music_info.html';
  var data = {
    index: index
  };
  getAndCallBack(url, data, function(responseText) {
    if (responseText.indexOf('サーバーに接続できません。') != -1) {
      if (order == 6) {
        updatePower();
      } else {
        startLoading(iidxid, order + 1);
      }
      return;
    }

    responseText.match(/<th scope="row">楽曲名<\/th>.+?<td class="music_info_td">\s+?([^\s].*?)<br \/>/);
    var title = RegExp.$1;
    logger("title:" + title);

    responseText.match(/<h4>SP<\/h4>.+?<tr>.+?<\/tr>.+?<tr>.+?clflg(.).+?clflg(.).+?clflg(.).+?<\/tr>.+?<tr>.+?<\/tr>.+?<tr>.+?<td.+?>(.+?)\(.+?<td.+?>(.+?)\(.+?<td.+?>(.+?)\(.+?<\/tr>.+?<tr>.+?<td.+?>(.+?)<.+?<td.+?>(.+?)<.+?<td.+?>(.+?)<.+?<\/tr>/);
    var clear_lamp = Array(3);
    clear_lamp[0] = RegExp.$1;
    clear_lamp[1] = RegExp.$2;
    clear_lamp[2] = RegExp.$3;

    var score = Array(3);
    score[0] = RegExp.$4;
    score[1] = RegExp.$5;
    score[2] = RegExp.$6;

    var bp = Array(3);
    bp[0] = RegExp.$7;
    bp[1] = RegExp.$8;
    bp[2] = RegExp.$9;

    sendScoreData(iidxid, title, "SP", "N", clear_lamp[0], score[0], bp[0]);
    sendScoreData(iidxid, title, "SP", "H", clear_lamp[1], score[1], bp[1]);
    sendScoreData(iidxid, title, "SP", "A", clear_lamp[2], score[2], bp[2]);

    responseText.match(/<h4>DP<\/h4>.+?<tr>.+?<\/tr>.+?<tr>.+?clflg(.).+?clflg(.).+?clflg(.).+?<\/tr>.+?<tr>.+?<\/tr>.+?<tr>.+?<td.+?>(.+?)\(.+?<td.+?>(.+?)\(.+?<td.+?>(.+?)\(.+?<\/tr>.+?<tr>.+?<td.+?>(.+?)<.+?<td.+?>(.+?)<.+?<td.+?>(.+?)<.+?<\/tr>/);

    clear_lamp[0] = RegExp.$1;
    clear_lamp[1] = RegExp.$2;
    clear_lamp[2] = RegExp.$3;

    score[0] = RegExp.$4;
    score[1] = RegExp.$5;
    score[2] = RegExp.$6;

    bp[0] = RegExp.$7;
    bp[1] = RegExp.$8;
    bp[2] = RegExp.$9;

    sendScoreData(iidxid, title, "DP", "N", clear_lamp[0], score[0], bp[0]);
    sendScoreData(iidxid, title, "DP", "H", clear_lamp[1], score[1], bp[1]);
    sendScoreData(iidxid, title, "DP", "A", clear_lamp[2], score[2], bp[2]);

    $('title').text(title);
    loadScore(iidxid, order, index + 1);
  });
}

// start loading with alphabet search order: 0(ABCD) ~ 6(OTHERS)
function startLoading(iidxid, order) {
  var url  = 'http://p.eagate.573.jp/game/2dx/20/p/djdata/music.html';
  var data = {
    list: order,
    s: 2,
    page: 1
  };
  getAndCallBack(url, data, function() {
    loadScore(iidxid, order, 0);
  });
}

function sendScoreData(iidxid, title, playtype, difficulty, clear_lamp, score, bp) {
  logger("clear_lamp:" + clear_lamp);
  switch (Number(clear_lamp)) {
  case 0: clear_lamp = "-"; break;
  case 1: clear_lamp = "F"; break;
  case 2: clear_lamp = "A"; break;
  case 3: clear_lamp = "E"; break;
  case 4: clear_lamp = "C"; break;
  case 5: clear_lamp = "H"; break;
  case 6: clear_lamp = "EH"; break;
  case 7: clear_lamp = "FC"; break;
  default : clear_lamp = "-"; break;
  }
  if (score == "-") {
    score = "0";
  }
  var url = 'http://rps.beatech.net/scores/update';
  var data = {
    iidxid: iidxid,
    title: title,
    playtype: playtype,
    difficulty: difficulty,
    exscore: score,
    bp: bp,
    clear: clear_lamp
  };
  postData(url, data);
}

function updatePower(iidxid) {
  var url = 'http://rps.beatech.net/powers/update/' + iidxid;
  getAndCallBack(url, null, function(responseText) {
    alert("スコアの送信が完了しました。");
  });
}
