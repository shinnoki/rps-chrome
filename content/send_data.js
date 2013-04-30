function sendScoreData() {
  var list = 0;
  var sort = 2;
  var page = 1;
  var url  = 'http://tmp.beatech.net/users/create';

  Firebug.Console.log(url);

  var data = { iidxid: '4444-4444', djname: 'test' }; // POSTリクエストで送信するデータ

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    var READYSTATE_COMPLETED = 4;
    var HTTP_STATUS_OK = 200;

    if( xhr.readyState == READYSTATE_COMPLETED && xhr.status == HTTP_STATUS_OK ) {
      alert( xhr.responseText );
    }
  };

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(EncodeHTMLForm(data));
}
