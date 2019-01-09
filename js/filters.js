'use strict';

(function () {
  var housingTypeElement = document.querySelector('#housing-type');

  housingTypeElement.addEventListener('change', function () {
    console.log(housingTypeElement.value);
    console.log(window.advertisements);

    var advertisementsFilteredByType = window.advertisements.filter(function (advertisement) {
      if (housingTypeElement.value === 'any') {
        return true;
      }

      return advertisement.offer.type === housingTypeElement.value;
    });
    console.log(advertisementsFilteredByType);

    for (var i = 0; i < advertisementsFilteredByType.length; i++) {
      var currentAd = advertisementsFilteredByType[i];
      var adTitle = document.querySelector('[alt="' + currentAd.offer.title + '"]');
      window.util.removeElementFromDom(adTitle.parentElement);
    }
  });
}
)();
