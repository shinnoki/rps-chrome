function createUser() {
  var gate_url = 'http://p.eagate.573.jp/game/2dx/20/p/djdata/status.html';
  getAndCallBack(gate_url, null, function(responseText) {
    var iidxid = getIIDXID(responseText);
    var djname = getDJName(responseText);
    var rps_url  = 'http://rps.beatech.net/users/create';
    var data = { iidxid: iidxid, djname: djname };
    postData(rps_url, data);
    loadAllScoreData(iidxid);
  });
}

function getDJName(responseText) {
  responseText.match(/<th scope="row">DJ NAME<\/th>.+?<td>(.+?)<\/td>/);
  return RegExp.$1;
}

function getIIDXID(responseText) {
  responseText.match(/<th scope="row">IIDX ID<\/th>.+?<td>(.+?)<\/td>/);
  return RegExp.$1;
}
