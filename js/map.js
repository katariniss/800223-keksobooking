'use strict';

var HOUSE_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
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

var advertisements = generateAds(ADS_COUNT);

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
  var resultWithDuplicates = [];

  for (var i = 0; i < randomInteger(1, 8); i++) {
    var g = randomInteger(0, FEATURES.length - 1);
    resultWithDuplicates.push(FEATURES[g]);
  }

  var resultWithoutDuplicates = [];

  for (var j = 0; j < resultWithDuplicates.length; j++) {
    var currentFeature = resultWithDuplicates[j];

    if (resultWithoutDuplicates.indexOf(currentFeature) === -1) {
      resultWithoutDuplicates.push(currentFeature);
    }
  }

  return resultWithoutDuplicates;
}

function getAdvertisement() {
  var roomsNumber = randomInteger(ROOMS_MIN, ROOMS_MAX);
  var houseTypeIndex = randomInteger(0, HOUSE_TYPES.length - 1);
  var houseType = HOUSE_TYPES[houseTypeIndex];
  var houseTitleIndex = randomInteger(0, HOUSE_TITLES.length - 1);
  var houseTitle = HOUSE_TITLES[houseTitleIndex];
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
      'avatar': 'img/avatars/user' + pad(avatarNumber) + '.png'
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
      'photos': shuffle(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']),
    },

    'location': {
      'x': locationX,
      'y': locationY,
    }
  };
}

function pad(num) {
  return (num < 10)
    ? '0' + num
    : num;
}

function shuffle(items) {
  for (var i = 0; i < items.length; i++) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var temp = items[i];
    items[i] = items[randomIndex];
    items[randomIndex] = temp;
  }

  return items;
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('button');

var advertisementsPinsFragment = document.createDocumentFragment();

for (var i = 0; i < advertisements.length; i++) {
  var currentAdvertisement = advertisements[i];
  var currentPin = pinTemplate.cloneNode(true);
  currentPin.setAttribute('style', 'left:' + (currentAdvertisement.location.x - 25) + 'px;' + 'top:' + (currentAdvertisement.location.y - 70) + 'px;');

  var currentPinImg = currentPin.querySelector('img');

  currentPinImg.setAttribute('src', currentAdvertisement.author.avatar);
  currentPinImg.setAttribute('alt', currentAdvertisement.offer.title);

  advertisementsPinsFragment.appendChild(currentPin);
}

mapPins.appendChild(advertisementsPinsFragment);

var cardTemplate = document.querySelector('#card').content.querySelector('article');

var firstAdvertisementCard = cardTemplate.cloneNode(true);

var mapFiltersContainer = document.querySelector('map__filters-container');

var firstAdvertisementOffer = advertisements[0].offer;

setElementContent('.popup__title', firstAdvertisementOffer.title);
setElementContent('.popup__text--address', firstAdvertisementOffer.address);
setElementContent('.popup__text--price', firstAdvertisementOffer.price + '₽/ночь');

var accomodationType = '';
if (firstAdvertisementOffer.type === 'flat') {
  accomodationType = 'Квартира';
}
if (firstAdvertisementOffer.type === 'bungalo') {
  accomodationType = 'Бунгало';
}
if (firstAdvertisementOffer.type === 'house') {
  accomodationType = 'Дом';
}
if (firstAdvertisementOffer.type === 'palace') {
  accomodationType = 'Дворец';
}

setElementContent('.popup__type', accomodationType);
setElementContent('.popup__text--capacity', firstAdvertisementOffer.rooms + ' комнаты для ' + firstAdvertisementOffer.guests + ' гостей');
setElementContent('.popup__text--time', 'Заезд после ' + firstAdvertisementOffer.checkin + ', выезд до ' + firstAdvertisementOffer.checkout);

var offerFeaturesFragment = document.createDocumentFragment();

var offerFeaturesList = document.createElement('ul');
offerFeaturesList.classList.add('popup__features');

for (var j = 0; j < firstAdvertisementOffer.features.length; j++) {
  var currentOfferFeature = firstAdvertisementOffer.features[j];

  var offerFeature = document.createElement('li');

  offerFeature.classList.add('popup__feature', 'popup__feature--' + currentOfferFeature);

  offerFeaturesFragment.appendChild(offerFeature);
}

offerFeaturesList.appendChild(offerFeaturesFragment);

var featuresListFromTemplate = firstAdvertisementCard.querySelector('ul');
featuresListFromTemplate.parentNode.replaceChild(offerFeaturesList, featuresListFromTemplate);

setElementContent('.popup__description', firstAdvertisementOffer.description);

var offerPhotosFragment = document.createDocumentFragment();

var offerPhotoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

var offerPhotosList = document.createElement('div');
offerPhotosList.classList.add('popup__photos');

for (var k = 0; k < firstAdvertisementOffer.photos.length; k++) {
  var currentPhotoUrl = firstAdvertisementOffer.photos[k];
  var currentPhoto = offerPhotoTemplate.cloneNode(true);

  currentPhoto.setAttribute('src', currentPhotoUrl);

  offerPhotosFragment.appendChild(currentPhoto);
}

offerPhotosList.appendChild(offerPhotosFragment);

var photosFromTemplate = firstAdvertisementCard.querySelector('.popup__photos');
photosFromTemplate.parentNode.replaceChild(offerPhotosList, photosFromTemplate);

map.insertBefore(firstAdvertisementCard, mapFiltersContainer);

function setElementContent(selector, textContent) {
  var elementBySelector = firstAdvertisementCard.querySelector(selector);

  elementBySelector.textContent = textContent;
}

var firstCardAvatar = firstAdvertisementCard.querySelector('.popup__avatar');
var currentAvatarUrl = advertisements[0].author.avatar;
firstCardAvatar.setAttribute('src', currentAvatarUrl);
