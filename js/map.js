'use strict';

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo']
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;

var ADS_COUNT = 8;
var advertisements = generateAds(ADS_COUNT);

function generateAds(numberOfAdvertisements) {
  var result = [];
  for (var i = 0; i < numberOfAdvertisements; i++) {
    var roomsNumber = randomInteger(ROOMS_MIN, ROOMS_MAX);
    result.push(getAdvertisement(roomsNumber));
    Math.floor(Math.random() * 4);
  }
  return result;
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function getAdvertisement(roomsNumber) {
  return {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },

    'offer': {
      'title': 'Большая уютная квартира',
      'address': '300, 400',
      'price': 100000,
      'type': 'flat',
      'rooms': roomsNumber,
      'guests': 6,
      'checkin': '12:00',
      'checkout': '14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    'location': {
      'x': 300,
      'y': 400,
    }
  };
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
