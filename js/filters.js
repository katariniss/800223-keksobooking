'use strict';

(function () {
  var housingTypeElement = document.querySelector('#housing-type');
  var housingRoomsElement = document.querySelector('#housing-rooms');

  housingTypeElement.addEventListener('change', function () {
    handleFilterChange(filterByType);
  });


  housingRoomsElement.addEventListener('change', function () {
    handleFilterChange(filterByRooms);
  });

  function handleFilterChange(filterCallback) {
    var filteredAds = window.advertisements.filter(filterCallback);

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


  function filterByType(advertisement) {
    if (housingTypeElement.value === 'any') {
      return true;
    }

    return advertisement.offer.type === housingTypeElement.value;
  }

  function filterByRooms(advertisement) {
    if (housingRoomsElement.value === 'any') {
      return true;
    }

    return advertisement.offer.rooms === Number(housingRoomsElement.value);
  }
}
)();
