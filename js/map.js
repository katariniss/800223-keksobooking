'use strict';

var MAIN_PIN_MIN_X = 0;
var MAIN_PIN_MAX_X = 1135;
var MAIN_PIN_MIN_Y = 110;
var MAIN_PIN_MAX_Y = 630;

window.map = map;

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
    window.removeElementFromDom(openedCard);
  }

  window.mapPinMainCoordinates = {
    x: '570px',
    y: '375px'
  };
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
    window.removeElementFromDom(currentPin);
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
        window.removeElementFromDom(openedCard);
      }
      window.showPinCard(object);
    });

    return pin;
  }
}
