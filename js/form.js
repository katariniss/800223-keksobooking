'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;

  var ROOMS_SYNC_CAPACITY = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var filterForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var clearButton = adForm.querySelector('.ad-form__reset'); var accomodationTypeInForm = document.querySelector('#type');
  var priceInForm = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomsNumberInForm = document.querySelector('#room_number');
  var capacityInForm = document.querySelector('#capacity');
  var capacityOptions = capacityInForm.querySelectorAll('option');

  var mapPinMain = document.querySelector('.map__pin--main');

  var main = document.querySelector('main');

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

  onRoomsChanged();

  roomsNumberInForm.addEventListener('change', onRoomsChanged);

  function onRoomsChanged() {
    var availableCapacityOptions = ROOMS_SYNC_CAPACITY[roomsNumberInForm.value];
    var currentCapcityOption = capacityInForm.querySelector('option[value="' + capacityInForm.value + '"]');

    capacityOptions.forEach(function (option) {
      option.disabled = availableCapacityOptions.indexOf(option.value) === -1;
    });

    if (currentCapcityOption.disabled) {
      capacityInForm.value = availableCapacityOptions[0];
    }
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

    addressField.value = Math.floor(x) + ', ' + Math.floor(y);
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

  adForm.addEventListener('submit', function (submitEvt) {
    if (adForm.checkValidity()) {
      submitEvt.preventDefault();
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

      function closePopupOnClick() {
        window.util.removeElementFromDom(message);
        document.removeEventListener('keydown', closePopupOnClick);
      }
      document.addEventListener('click', closePopupOnClick);

      function closePopup(evt) {
        if (evt.keyCode === 27) {
          window.util.removeElementFromDom(message);
          document.removeEventListener('keydown', closePopup);
        }
      }
      document.addEventListener('keydown', closePopup);
    }
  });
})();
