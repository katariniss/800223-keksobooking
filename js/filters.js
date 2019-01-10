'use strict';

(function () {
  var housingTypeElement = document.querySelector('#housing-type');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingPriceElement = document.querySelector('#housing-price');

  housingTypeElement.addEventListener('change', handleFilterChange);

  housingRoomsElement.addEventListener('change', handleFilterChange);

  housingGuestsElement.addEventListener('change', handleFilterChange);

  housingPriceElement.addEventListener('change', handleFilterChange);

  function handleFilterChange() {
    var filteredByType = window.advertisements.filter(filterByType);
    var filteredByRooms = window.advertisements.filter(filterByRooms);
    var filteredByGuests = window.advertisements.filter(filterByGuests);
    var filteredByPrice = window.advertisements.filter(filterByPriceRange);

    var firstIntersection = intersect(filteredByType, filteredByRooms);

    var secondIntersection = intersect(firstIntersection, filteredByGuests);

    var filteredAds = intersect(secondIntersection, filteredByPrice);

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

  function intersect(firstArray, secondArray) {
    return firstArray.filter(function (n) {
      return secondArray.indexOf(n) !== -1;
    });
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

  function filterByGuests(advertisement) {
    if (housingGuestsElement.value === 'any') {
      return true;
    }

    return advertisement.offer.guests === Number(housingGuestsElement.value);
  }


  function filterByPriceRange(advertisement) {
    var priceRange = housingPriceElement.value;

    if (priceRange === 'any') {
      return true;
    }

    var price = advertisement.offer.price;

    switch (priceRange) {
      case 'middle':
        return (price > 10000 && price < 50000);
      case 'low':
        return (price < 10000);
      case 'high':
        return (price > 50000);
    }

    return false;
  }
}
)();
