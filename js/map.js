'use strict';

var MAIN_PIN_MIN_X = 0;
var MAIN_PIN_MAX_X = 1135;
var MAIN_PIN_MIN_Y = 110;
var MAIN_PIN_MAX_Y = 630;

var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');

window.renderMap = renderMap;
window.resetMapToDefault = resetMapToDefault;

function resetMapToDefault() {
  map.classList.add('map--faded');
  mapPinMain.addEventListener('mouseup', window.renderMap);
  removePins();
  var openedCard = document.querySelector('.map__card.popup');
  if (openedCard) {
    removeElementFromDom(openedCard);
  }
}

function renderMap() {
  var advertisements = window.generateAds();

  createPinsOnMap(advertisements);
  map.classList.remove('map--faded');
  window.toggleForms(false);
  mapPinMain.removeEventListener('mouseup', renderMap);
}

function removePins() {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pins.length; i++) {
    var currentPin = pins[i];
    removeElementFromDom(currentPin);
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
