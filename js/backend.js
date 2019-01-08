'use strict';

(function () {

  window.backend = {
    loadAdvertisements: loadAdvertisements,
    submitAdvertisement: submitAdvertisement,
  };

  function loadAdvertisements(onSuccess, onError) {
    sendRequest('GET', 'https://js.dump.academy/keksobooking/data', onSuccess, onError);
  }

  function submitAdvertisement(data, onSuccess, onError) {
    sendRequest('POST', 'https://js.dump.academy/keksobooking', onSuccess, onError, data);
  }

  function sendRequest(method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open(method, url);
    xhr.send(data);
  }

})();
