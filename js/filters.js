'use strict';

(function () {
  var housingTypeElement = document.querySelector('#housing-type');

  housingTypeElement.addEventListener('change', function () {

    var filteredAds = window.advertisements.filter(function (advertisement) {
      if (housingTypeElement.value === 'any') {
        return true;
      }

      return advertisement.offer.type === housingTypeElement.value;
    });

    window.removePins();

    window.createPinsOnMap(filteredAds);

    var mapCard = document.querySelector('.map__card');

    for (var i = 0; i < window.advertisements.length; i++) {
      var currentAd = window.advertisements[i];

      if (filteredAds.indexOf(currentAd) === -1) {
        if (mapCard) {
          var cardTitle = mapCard.querySelector('.popup__title').textContent;
          if (cardTitle === currentAd.offer.title) {
            window.util.removeElementFromDom(mapCard);
          }
        }
      }
    }
  }
  );

  var housingRoomsElement = document.querySelector('#housing-rooms');

  housingRoomsElement.addEventListener('change', function () {

    var filteredAds = window.advertisements.filter(function (advertisement) {
      if (housingRoomsElement.value === 'any') {
        return true;
      }

      return advertisement.offer.rooms === Number(housingRoomsElement.value);
    });

    window.removePins();

    window.createPinsOnMap(filteredAds);

    var mapCard = document.querySelector('.map__card');

    for (var i = 0; i < window.advertisements.length; i++) {
      var currentAd = window.advertisements[i];

      if (filteredAds.indexOf(currentAd) === -1) {
        if (mapCard) {
          var cardTitle = mapCard.querySelector('.popup__title').textContent;
          if (cardTitle === currentAd.offer.title) {
            window.util.removeElementFromDom(mapCard);
          }
        }
      }
    }
  });
}
)();
