'use strict';

(function () {

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

  window.generateAds = generateAds;

  function generateAds() {
    var result = [];

    for (var i = 0; i < ADS_COUNT; i++) {
      result.push(getAdvertisement());
    }
    return result;
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
        'photos': shuffleArray([
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ]), // а почему остальные массивы вынесены в константы, а вот этот ты решила внутрь кода поместить? ;)
      },

      'location': {
        'x': locationX,
        'y': locationY,
      }
    };
  }

  function generateFeatures() {
    var featuresCopy = FEATURES.slice(0);
    var numberOfFeaturesToRemove = randomInteger(1, FEATURES.length - 1);

    for (var i = 0; i < numberOfFeaturesToRemove; i++) {
      featuresCopy.splice(randomInteger(0, featuresCopy.length - 1), 1);
    }

    return featuresCopy;
  }

  function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
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

})();
