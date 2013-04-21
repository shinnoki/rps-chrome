function loadScoreData() {
  var list = 0;
  var sort = 2;
  var page = 1;
  var url = 'http://p.eagate.573.jp/game/2dx/20/p/djdata/music.html';

  url += '?list=' + 0;
  url += '&s=' + sort;
  url += '&page=' + page;

  Firebug.Console.log('year');
  Firebug.Console.log(url);
  var reqest = new XMLHttpRequest();
  reqest.open('GET', url, true);

  if (request.status == 200) {
    Firebug.Console.log(request);
  }
}
