'use strict';

(function () {
  window.removeElementFromDom = removeElementFromDom;

  function removeElementFromDom(element) {
    element.parentNode.removeChild(element);
  }
})();
