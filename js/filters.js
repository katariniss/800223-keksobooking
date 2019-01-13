'use strict';

(function () {
  var housingTypeElement = document.querySelector('#housing-type');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingPriceElement = document.querySelector('#housing-price');
  var featuresElement = document.querySelector('#housing-features');

  housingTypeElement.addEventListener('change', debouncedHandle);

  housingRoomsElement.addEventListener('change', debouncedHandle);

  housingGuestsElement.addEventListener('change', debouncedHandle);

  housingPriceElement.addEventListener('change', debouncedHandle);

  featuresElement.addEventListener('change', debouncedHandle);

  function debouncedHandle() {
    window.debounce(handleFilterChange)();
  }

  function handleFilterChange() {
    var filteredAds = window.advertisements
      .filter(filterByType)
      .filter(filterByRooms)
      .filter(filterByGuests)
      .filter(filterByPriceRange)
      .filter(filterByFeatures);

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

  function getSelectedFeatures() {
    var checkboxes = featuresElement.querySelectorAll('.map__checkbox:checked');
    var featuresList = [];

    for (var i = 0; i < checkboxes.length; i++) {
      var currentCheckbox = checkboxes[i];
      featuresList.push(currentCheckbox.value);
    }
    return featuresList;
  }

  function filterByFeatures(advertisement) {

    var selectedFeatures = getSelectedFeatures();

    if (selectedFeatures.length === 0) {
      return true;
    }

    var c = intersect(selectedFeatures, advertisement.offer.features);

    return (c.length === selectedFeatures.length);
  }
}
)();
