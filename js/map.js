'use strict';

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87;

var MAIN_PIN_MIN_X = 0;
var MAIN_PIN_MAX_X = 1135;
var MAIN_PIN_MIN_Y = 110;
var MAIN_PIN_MAX_Y = 630;

var filterForm = document.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');

var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');
var clearButton = adForm.querySelector('.ad-form__reset');
var accomodationTypeInForm = document.getElementById('type');
var priceInForm = document.getElementById('price');
var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');
var roomsNumberInForm = document.getElementById('room_number');
var capacityInForm = document.getElementById('capacity');
var capacityOptions = document.getElementById('capacity').querySelectorAll('option');

var ROOMS_SYNC_CAPACITY = {
  1: [getCapacityOptionBy(1)],
  2: [getCapacityOptionBy(1), getCapacityOptionBy(2)],
  3: [getCapacityOptionBy(1), getCapacityOptionBy(2), getCapacityOptionBy(3)],
  100: [getCapacityOptionBy(0)]
};

resetMapToDefault();

function renderMap() {
  var advertisements = window.generateAds();

  createPinsOnMap(advertisements);
  map.classList.remove('map--faded');
  toggleAdForm(false);
  toggleFilterForm(false);
  setAddressFieldValue();
  mapPinMain.removeEventListener('mouseup', renderMap);
}

function resetMapToDefault() {
  map.classList.add('map--faded');
  toggleAdForm(true);
  toggleFilterForm(true);
  setAddressFieldValue();
  mapPinMain.addEventListener('mouseup', renderMap);
  removePins();
  var openedCard = document.querySelector('.map__card.popup');
  if (openedCard) {
    removeElementFromDom(openedCard);
  }
}

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    // window.mapPinMainCoordinates = {
    //   x: mapPinMain.offsetLeft - shift.x,
    //   y: mapPinMain.offsetTop - shift.y
    // };

    var newTop = (mapPinMain.offsetTop - shift.y);
    var newLeft = (mapPinMain.offsetLeft - shift.x);

    if (newTop > MAIN_PIN_MAX_Y) {
      newTop = MAIN_PIN_MAX_Y;
    }

    if (newTop < MAIN_PIN_MIN_Y) {
      newTop = MAIN_PIN_MIN_Y;
    }

    if (newLeft < MAIN_PIN_MIN_X) {
      newLeft = MAIN_PIN_MIN_X;
    }

    if (newLeft > MAIN_PIN_MAX_X) {
      newLeft = MAIN_PIN_MAX_X;
    }

    window.mapPinMainCoordinates = {
      x: newLeft,
      y: newTop
    };

    mapPinMain.style.top = newTop + 'px';
    mapPinMain.style.left = newLeft + 'px';

    window.setAddressFieldValue(newLeft, newTop);
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    window.setAddressFieldValue(window.mapPinMainCoordinates.x, window.mapPinMainCoordinates.y);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

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

clearButton.addEventListener('click', resetMapToDefault);

function removePins() {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pins.length; i++) {
    var currentPin = pins[i];
    removeElementFromDom(currentPin);
  }
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

function createPinsOnMap(objects) {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(getSinglePin(objects[i]));
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
        removeElementFromDom(openedCard);
      }
      showPinCard(object);
    });

    return pin;
  }
}

function removeElementFromDom(element) {
  element.parentNode.removeChild(element);
}

function showPinCard(object) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);
  var cardFeaturesList = card.querySelector('.popup__features');
  var cardPhotosBlock = card.querySelector('.popup__photos');
  var cardPhotoItem = cardPhotosBlock.querySelector('.popup__photo');
  var cardAvatar = card.querySelector('.popup__avatar');

  setElementContent('.popup__title', object.offer.title);
  setElementContent('.popup__text--address', object.offer.address);
  setElementContent('.popup__text--price', object.offer.price + '₽/ночь');
  setElementContent('.popup__type', getAccomodation(object.offer.type));
  setElementContent('.popup__text--capacity', object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей');
  setElementContent('.popup__text--time', 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout);
  setElementContent('.popup__description', object.offer.description);

  cardAvatar.src = object.author.avatar;

  fillCardFeatures(object.offer.features);
  fillCardPhotos(object.offer.photos);

  var closePopupButton = card.querySelector('.popup__close');

  closePopupButton.addEventListener('click', function () {
    removeElementFromDom(card);
  });

  function closePopup(evt) {
    if (evt.keyCode === 27) {
      removeElementFromDom(card);
      document.removeEventListener('keydown', closePopup);
    }
  }
  document.addEventListener('keydown', closePopup);

  map.appendChild(card);

  function getAccomodation(type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return 'Квартира';
    }
  }

  function fillCardFeatures(features) {
    while (cardFeaturesList.firstChild) {
      cardFeaturesList.removeChild(cardFeaturesList.firstChild);
    }

    for (var i = 0; i < features.length; i++) {
      cardFeaturesList.appendChild(getSingleFeature(features[i]));
    }

    function getSingleFeature(feature) {
      var item = document.createElement('li');

      item.classList.add('popup__feature', 'popup__feature--' + feature);

      return item;
    }
  }

  function fillCardPhotos(photos) {
    while (cardPhotosBlock.firstChild) {
      cardPhotosBlock.removeChild(cardPhotosBlock.firstChild);
    }

    for (var i = 0; i < photos.length; i++) {
      cardPhotosBlock.appendChild(getSinglePhoto(photos[i]));
    }

    function getSinglePhoto(photo) {
      var img = cardPhotoItem.cloneNode(true);

      img.src = photo;

      return img;
    }
  }

  function setElementContent(selector, textContent) {
    var element = card.querySelector(selector);

    element.textContent = textContent;
  }
}
