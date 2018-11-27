'use strict';

var advertisements = [
  {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },

    'offer': {
      'title': 'Большая уютная квартира',
      'address': '300, 400',
      'price': 100000,
      'type': 'flat',
      'rooms': 3,
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
  },

  {
    'author': {
      'avatar': 'img/avatars/user02.png'
    },

    'offer': {
      'title': 'Маленькая неуютная квартира',
      'address': '400, 550',
      'price': 30000,
      'type': 'flat',
      'rooms': 1,
      'guests': 2,
      'checkin': '12:00',
      'checkout': '14:00',
      'features': ['wifi', 'parking', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    'location': {
      'x': 400,
      'y': 550,
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user03.png'
    },

    'offer': {
      'title': 'Огромный прекрасный дворец',
      'address': '70, 300',
      'price': 1000000,
      'type': 'palace',
      'rooms': 30,
      'guests': 30,
      'checkin': '13:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    'location': {
      'x': 70,
      'y': 300,
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user04.png'
    },

    'offer': {
      'title': 'Маленький ужасный дворец',
      'address': '30, 400',
      'price': 500000,
      'type': 'palace',
      'rooms': 10,
      'guests': 10,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'parking', 'washer'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    'location': {
      'x': 30,
      'y': 400,
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user05.png'
    },

    'offer': {
      'title': 'Красивый гостевой домик',
      'address': '80, 450',
      'price': 89000,
      'type': 'house',
      'rooms': 4,
      'guests': 10,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    'location': {
      'x': 80,
      'y': 450,
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user06.png'
    },

    'offer': {
      'title': 'Некрасивый негостеприимный домик',
      'address': '500, 200',
      'price': 30000,
      'type': 'house',
      'rooms': 2,
      'guests': 2,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['dishwasher', 'parking', 'washer', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    'location': {
      'x': 500,
      'y': 200,
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user07.png'
    },

    'offer': {
      'title': 'Уютное бунгало далеко от моря',
      'address': '200, 200',
      'price': 65000,
      'type': 'bungalo',
      'rooms': 3,
      'guests': 6,
      'checkin': '13:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    'location': {
      'x': 200,
      'y': 200,
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user08.png'
    },

    'offer': {
      'title': 'Неуютное бунгало по колено в воде',
      'address': '250, 120',
      'price': 40000,
      'type': 'bungalo',
      'rooms': 3,
      'guests': 6,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'parking'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    'location': {
      'x': 250,
      'y': 120,
    }
  },
];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('button');

var advertisementsPinsFragment = document.createDocumentFragment();

for (var i = 0; i < advertisements.length; i++) {
  var currentAdvertisement = advertisements[i];
  var currentPin = pinTemplate.cloneNode(true);
  currentPin.setAttribute('style', 'left:' + currentAdvertisement.location.x + 'px;' + 'top:' + currentAdvertisement.location.y + 'px;');

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
setElementContent('.popup__photos', firstAdvertisementOffer.photos);


map.insertBefore(firstAdvertisementCard, mapFiltersContainer);

function setElementContent(selector, textContent) {
  var elementBySelector = firstAdvertisementCard.querySelector(selector);

  elementBySelector.textContent = textContent;
}
