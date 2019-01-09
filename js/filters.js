'use strict';

(function () {
  var housingTypeElement = document.querySelector('#housing-type');

  housingTypeElement.addEventListener('change', function () {

    var advertisementsFilteredByType = window.advertisements.filter(function (advertisement) {
      if (housingTypeElement.value === 'any') {
        return true;
      }

      return advertisement.offer.type === housingTypeElement.value;
    });

    for (var i = 0; i < window.advertisements.length; i++) {
      var currentAd = window.advertisements[i];
      if (advertisementsFilteredByType.indexOf(currentAd) === -1) {
        var adTitle = document.querySelector('[alt="' + currentAd.offer.title + '"]');
        window.util.removeElementFromDom(adTitle.parentElement);
      }
    }
  });
}
)();
