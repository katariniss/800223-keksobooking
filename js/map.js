'use strict';

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var HOUSE_TITLES = {
  palace: ['Огромный прекрасный дворец', 'Маленький ужасный дворец'],
  flat: ['Большая уютная квартира', 'Маленькая неуютная квартира'],
  bungalo: ['Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  house: ['Красивый гостевой домик', 'Некрасивый негостеприимный домик'],
};
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var X_MAX = 980;
var Y_MAX = 750;
var AVATAR_MIN = 1;
var AVATAR_MAX = 8;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;

var ADS_COUNT = 8;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87;

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
  var advertisements = generateAds(ADS_COUNT);

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
  var pins = document.querySelectorAll('.map__pin');
  for (var i = 0; i < pins.length; i++) {
    var currentPin = pins[i];
    if (!currentPin.classList.contains('map__pin--main')) {
      removeElementFromDom(currentPin);
    }
  }
}

accomodationTypeInForm.addEventListener('change', function () {
  if (accomodationTypeInForm.value === 'palace') {
    priceInForm.min = '10000';
    priceInForm.placeholder = '10000';
  } else if (accomodationTypeInForm.value === 'flat') {
    priceInForm.min = '1000';
    priceInForm.placeholder = '1000';
  } else if (accomodationTypeInForm.value === 'bungalo') {
    priceInForm.min = '0';
    priceInForm.placeholder = '0';
  } else if (accomodationTypeInForm.value === 'house') {
    priceInForm.min = '5000';
    priceInForm.placeholder = '5000';
  }
});

timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
});

syncRoomsNumberWithCapacity();

roomsNumberInForm.addEventListener('change', function () {
  syncRoomsNumberWithCapacity();
});

function syncRoomsNumberWithCapacity() {
  for (var i = 0; i < capacityOptions.length; i++) {
    var currentCapacityOption = capacityOptions[i];
    currentCapacityOption.setAttribute('disabled', true);
  }

  var availableCapacityOptions = getAvailableCapacityOptions(roomsNumberInForm.value);

  var needToClearCapacityValue = true;
  for (var k = 0; k < availableCapacityOptions.length; k++) {
    var currentOption = availableCapacityOptions[k];

    if (currentOption.value === capacityInForm.value) {
      needToClearCapacityValue = false;
    }
  }

  if (needToClearCapacityValue) {
    capacityInForm.value = null;
  }

  for (var j = 0; j < availableCapacityOptions.length; j++) {
    var currentAvailableOption = availableCapacityOptions[j];
    currentAvailableOption.removeAttribute('disabled');
  }
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

function generateAds(numberOfAds) {
  var result = [];

  for (var i = 0; i < numberOfAds; i++) {
    result.push(getAdvertisement());
  }
  return result;
}

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function generateFeatures() {
  var featuresCopy = FEATURES.slice(0);
  var numberOfFeaturesToRemove = randomInteger(1, FEATURES.length - 1);

  for (var i = 0; i < numberOfFeaturesToRemove; i++) {
    featuresCopy.splice(randomInteger(0, featuresCopy.length - 1), 1);
  }

  return featuresCopy;
}

function getAdvertisement() {
  var roomsNumber = randomInteger(ROOMS_MIN, ROOMS_MAX);
  var houseTypeIndex = randomInteger(0, HOUSE_TYPES.length - 1);
  var houseType = HOUSE_TYPES[houseTypeIndex];
  var houseTypeTitles = HOUSE_TITLES[houseType];
  var houseTitleIndex = randomInteger(0, houseTypeTitles.length - 1);
  var houseTitle = houseTypeTitles[houseTitleIndex];
  var locationX = randomInteger(0, X_MAX);
  var locationY = randomInteger(200, Y_MAX);
  var avatarNumber = randomInteger(AVATAR_MIN, AVATAR_MAX);
  var price = randomInteger(PRICE_MIN, PRICE_MAX);
  var checkinIndex = randomInteger(0, CHECKIN.length - 1);
  var checkin = CHECKIN[checkinIndex];
  var checkoutIndex = randomInteger(0, CHECKOUT.length - 1);
  var checkout = CHECKOUT[checkoutIndex];
  var guestsNumber = randomInteger(GUESTS_MIN, GUESTS_MAX);

  return {
    'author': {
      'avatar': 'img/avatars/user' + getTwoDigits(avatarNumber) + '.png'
    },

    'offer': {
      'title': houseTitle,
      'address': locationX + ', ' + locationY,
      'price': price,
      'type': houseType,
      'rooms': roomsNumber,
      'guests': guestsNumber,
      'checkin': checkin,
      'checkout': checkout,
      'features': generateFeatures(),
      'description': '',
      'photos': shuffleArray(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']), // а почему остальные массивы вынесены в константы, а вот этот ты решила внутрь кода поместить? ;)
    },

    'location': {
      'x': locationX,
      'y': locationY,
    }
  };
}

function getTwoDigits(num) {
  return (num < 10) ?
    '0' + num :
    num;
}

function shuffleArray(items) {
  for (var i = 0; i < items.length; i++) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var temp = items[i];
    items[i] = items[randomIndex];
    items[randomIndex] = temp;
  }

  return items;
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
