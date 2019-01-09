'use strict';

(function () {
  var housingTypeElement = document.querySelector('#housing-type');

  housingTypeElement.addEventListener('change', function () {

    var advertisementsFilteredByType = window.advertisements.filter(function (advertisement) {
      if (housingTypeElement.value === 'any') {
        return true;
      }

      return advertisement.offer.type === housingTypeElement.value;
    });

    window.removePins();

    window.createPinsOnMap(advertisementsFilteredByType);

    var mapCard = document.querySelector('.map__card');

    for (var i = 0; i < window.advertisements.length; i++) {
      var currentAd = window.advertisements[i];

      if (advertisementsFilteredByType.indexOf(currentAd) === -1) {
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
}
)();
