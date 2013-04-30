function loadScoreData() {
  var list = 0;
  var sort = 2;
  var page = 1;
  var url  = 'http://p.eagate.573.jp/game/2dx/20/p/djdata/music.html';
  var url2 = 'http://p.eagate.573.jp/game/2dx/20/p/djdata/music_info.html?index=1';

  url += '?list=' + list;
  url += '&s=' + sort;
  url += '&page=' + page;
  url += '&' + (new Date().getTime());


  Firebug.Console.log(url);

  var xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.send();

  func = function() {
    xhr.open("GET", url2, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        Firebug.Console.log(xhr.responseText);
      }
    };
  };
  xhr.onreadystatechange = func;
  getAndCallback(nil, nil);
}
