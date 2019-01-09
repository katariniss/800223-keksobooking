'use strict';

(function () {

  window.createPinsOnMap = createPinsOnMap;

  function createPinsOnMap() {
    var objects = window.advertisements;
    var mapPins = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < objects.length; i++) {
      var currentObj = objects[i];
      if (currentObj.offer) {
        fragment.appendChild(getSinglePin(currentObj));
      }
    }

    mapPins.appendChild(fragment);

    function getSinglePin(object) {
      var pin = pinTemplate.cloneNode(true);
      var pinImg = pin.querySelector('img');

      pin.setAttribute('style', 'left:' + (object.location.x - 25) + 'px;' + 'top:' + (object.location.y - 70) + 'px;');
      pinImg.setAttribute('src', object.author.avatar);
      pinImg.setAttribute('alt', object.offer.title);

      pin.addEventListener('click', function () {
        var openedCard = document.querySelector('.map__card.popup');
        if (openedCard) {
          window.util.removeElementFromDom(openedCard);
        }
        window.showPinCard(object);
      });

      return pin;
    }
  }
})();
