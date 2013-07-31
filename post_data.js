function postData(url, data) {
  var list = 0;
  var sort = 2;
  var page = 1;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    var READYSTATE_COMPLETED = 4;
    var HTTP_STATUS_OK = 200;

    if (xhr.readyState == READYSTATE_COMPLETED && xhr.status == HTTP_STATUS_OK ) {
      logger(xhr.responseText);
    }
  };

  logger(encodePostForm(data));
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(encodePostForm(data));
}

function encodePostForm(data) {
  var params = [];

  for (var name in data) {
    var value = data[name];
    var param = encodeURIComponent(name).replace(/%20/g, '+')
          + '=' + encodeURIComponent(value).replace(/%20/g, '+');
    params.push(param);
  }
  return params.join('&');
}
