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
    var values = {
      type: housingTypeElement.value,
      price: housingPriceElement.value,
      rooms: housingRoomsElement.value,
      guests: housingGuestsElement.value,
      features: getSelectedFeatures()
    };

    var filteredAds = window.advertisements
      .filter(filterByType)
      .filter(filterByRooms)
      .filter(filterByGuests)
      .filter(filterByPriceRange)
      .filter(filterByFeatures);

    window.removePins();
    window.createPinsOnMap(filteredAds);

    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      window.util.removeElementFromDom(mapCard);
    }

    function filterByType(advertisement) {
      return advertisement.offer.type === values.type || values.type === 'any';
    }

    function filterByRooms(advertisement) {
      return advertisement.offer.rooms === Number(values.rooms) || (values.rooms === 'any');
    }

    function filterByGuests(advertisement) {
      return advertisement.offer.guests === Number(values.guests) || values.guests === 'any';
    }


    function filterByPriceRange(advertisement) {
      var priceRange = values.price;
      var price = Number(advertisement.offer.price);

      if (priceRange === 'any') {
        return true;
      }

      switch (priceRange) {
        case 'middle':
          return (price > 10000 && price < 50000);
        case 'low':
          return (price <= 10000);
        case 'high':
          return (price >= 50000);
      }

      return false;
    }

    function filterByFeatures(advertisement) {
      var selectedFeatures = values.features;
      var isSuitable = true;

      if (window.util.isEmptyArray(advertisement.offer.features)) {
        return false;
      }

      for (var i = 0; i < selectedFeatures.length; i++) {
        if (advertisement.offer.features.indexOf(selectedFeatures[i]) === -1) {
          isSuitable = false;
          break;
        }
      }

      return isSuitable;
    }
  }

  function getSelectedFeatures() {
    var checkboxes = featuresElement.querySelectorAll('.map__checkbox:checked');
    var featuresList = [];

    checkboxes.forEach(function (checkbox) {
      featuresList.push(checkbox.value);
    });

    return featuresList;
  }
}
)();
