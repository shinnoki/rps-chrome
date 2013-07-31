function getAndCallBack(url, data, callback) {
  var xhr = new XMLHttpRequest();

  if (data != null) {
    url += encodeGetForm(data);
  }
  logger(url);
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText);
    }
  };
}

function encodeGetForm(data) {
  var params = [];

  for (var name in data) {
    var value = data[name];
    var param = encodeURIComponent(name).replace(/%20/g, '+')
          + '=' + encodeURIComponent(value).replace(/%20/g, '+');
    params.push(param);
  }
  return '?' + params.join('&');
}
