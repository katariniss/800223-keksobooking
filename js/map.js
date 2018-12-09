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

var map = document.querySelector('.map');

renderMap();

function renderMap() {
  var advertisements = generateAds(ADS_COUNT);

  createPinsOnMap(advertisements);
  subscribeOnPinsClick(advertisements);
  disableFormTags('.ad-form fieldset');
  disableFormTags('.map__filters fieldset');
  disableFormTags('.map__filters select');

}

function disableFormTags(tagsSelector) {
  var tagsToDisable = document.querySelectorAll(tagsSelector);
  for (var i = 0; i < tagsToDisable.length; i++) {
    tagsToDisable[i].setAttribute('disabled', 'disabled');
  }
}

function enableFormTags(tagsSelector) {
  var tagsToEnable = document.querySelectorAll(tagsSelector);
  for (var i = 0; i < tagsToEnable.length; i++) {
    tagsToEnable[i].removeAttribute('disabled', 'disabled');
  }
}

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  enableFormTags('.ad-form fieldset');
  enableFormTags('.map__filters fieldset');
  enableFormTags('.map__filters select');
});

function subscribeOnPinsClick(advertisements) {
  var pins = document.querySelectorAll('.map__pin');

  for (var i = 0; i < pins.length; i++) {
    var currentPin = pins[i];
    if (!currentPin.classList.contains('map__pin--main')) {
      currentPin.addEventListener('click', function () {
        showPinCard(advertisements[0]);
      });
    }
  }
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

    return pin;
  }
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
