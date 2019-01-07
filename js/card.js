'use strict';

(function () {
  window.showPinCard = showPinCard;

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
      window.util.removeElementFromDom(card);
    });

    function closePopup(evt) {
      if (evt.keyCode === 27) {
        window.util.removeElementFromDom(card);
        document.removeEventListener('keydown', closePopup);
      }
    }
    document.addEventListener('keydown', closePopup);

    window.map.appendChild(card);

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

      if (window.util.isEmptyArray) {
        cardFeaturesList.classList.add('hidden');
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

      if (window.util.isEmptyArray) {
        cardPhotosBlock.classList.add('hidden');
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
})();
