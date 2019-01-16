'use strict';

(function () {

  window.util = {
    removeElementFromDom: removeElementFromDom,
    isEmptyArray: isEmptyArray,
    hideElement: hideElement,
  };

  function removeElementFromDom(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  function isEmptyArray(array) {
    return !array || array.length === 0;
  }

  function hideElement(element) {
    element.classList.add('hidden');
  }
}
)();
