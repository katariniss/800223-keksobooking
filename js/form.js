'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;


  var filterForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var clearButton = adForm.querySelector('.ad-form__reset'); var accomodationTypeInForm = document.getElementById('type');
  var priceInForm = document.getElementById('price');
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
  var roomsNumberInForm = document.getElementById('room_number');
  var capacityInForm = document.getElementById('capacity');
  var capacityOptions = document.getElementById('capacity').querySelectorAll('option');

  var mapPinMain = document.querySelector('.map__pin--main');

  var submitButton = document.querySelector('.ad-form__submit');

  var main = document.querySelector('main');

  var ROOMS_SYNC_CAPACITY = {
    1: [getCapacityOptionBy(1)],
    2: [getCapacityOptionBy(1), getCapacityOptionBy(2)],
    3: [getCapacityOptionBy(1), getCapacityOptionBy(2), getCapacityOptionBy(3)],
    100: [getCapacityOptionBy(0)]
  };

  window.toggleForms = toggleForms;
  window.setAddressFieldValue = setAddressFieldValue;

  function toggleForms(isDisabled) {
    toggleAdForm(isDisabled);
    toggleFilterForm(isDisabled);
    setAddressFieldValue();
  }

  function toggleFilterForm(isDisabled) {
    var fields = filterForm.querySelectorAll('fieldset, .map__filter');

    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = isDisabled;
    }
    if (isDisabled) {
      filterForm.reset();
    }
  }

  function toggleAdForm(isDisabled) {
    var fields = adForm.querySelectorAll('fieldset');

    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = isDisabled;
    }
    if (isDisabled) {
      adForm.reset();
      adForm.classList.add('ad-form--disabled');
    } else {
      adForm.classList.remove('ad-form--disabled');
    }
  }

  clearButton.addEventListener('click', function () {
    window.resetAppToDefault();
  });

  accomodationTypeInForm.addEventListener('change', getPriceByAccomodation);

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  syncRoomsNumberWithCapacity();

  roomsNumberInForm.addEventListener('change', syncRoomsNumberWithCapacity);

  function syncRoomsNumberWithCapacity() {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = true;
    }

    var availableCapacityOptions = getAvailableCapacityOptions(roomsNumberInForm.value);

    var needToChangeCapacityValue = true;
    for (var k = 0; k < availableCapacityOptions.length; k++) {
      needToChangeCapacityValue = needToChangeCapacityValue && !(availableCapacityOptions[k].value === capacityInForm.value);
    }

    for (var j = 0; j < availableCapacityOptions.length; j++) {
      var currentAvailableOption = availableCapacityOptions[j];
      currentAvailableOption.removeAttribute('disabled');
    }
    availableCapacityOptions[0].selected = true;
  }

  function getAvailableCapacityOptions(roomsNumber) {
    return ROOMS_SYNC_CAPACITY[roomsNumber];
  }

  function getCapacityOptionBy(numberOfPeople) {
    var numberOfPeopleStr = numberOfPeople.toString();
    for (var i = 0; i < capacityOptions.length; i++) {
      var currentCapacityOption = capacityOptions[i];
      if (currentCapacityOption.value === numberOfPeopleStr) {
        return currentCapacityOption;
      }
    }
    return undefined;
  }

  function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  function setAddressFieldValue() {
    var elementCoordinates = getOffset(mapPinMain);
    var addressField = document.querySelector('#address');
    var x = elementCoordinates.left + MAIN_PIN_WIDTH / 2;
    var y = elementCoordinates.top + MAIN_PIN_HEIGHT / 2;

    addressField.value = x + ', ' + y;
  }

  function getPriceByAccomodation() {
    switch (accomodationTypeInForm.value) {
      case 'palace':
        priceInForm.min = '10000';
        priceInForm.placeholder = '10000';
        break;
      case 'flat':
        priceInForm.min = '1000';
        priceInForm.placeholder = '1000';
        break;
      case 'bungalo':
        priceInForm.min = '0';
        priceInForm.placeholder = '0';
        break;
      case 'house':
        priceInForm.min = '5000';
        priceInForm.placeholder = '5000';
    }
  }

  submitButton.addEventListener('click', function (evt) {
    if (adForm.checkValidity()) {
      evt.preventDefault();
    } else {
      return;
    }
    var adFormData = new FormData(adForm);
    window.backend.submitAdvertisement(adFormData, onSuccess, onError);

    function onError() {
      showPopup('error');
    }

    function onSuccess() {
      window.resetAppToDefault();

      showPopup('success');
    }

    function showPopup(templateName) {
      var messageTemplate = document.querySelector('#' + templateName)
        .content.querySelector('.' + templateName);

      var message = messageTemplate.cloneNode(true);

      main.appendChild(message);

      var tryAgainButton = message.querySelector('button');

      tryAgainButton.addEventListener('click', function () {
        window.util.removeElementFromDom(message);
      });
    }
  });
})();
