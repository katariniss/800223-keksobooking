'use strict';

(function () {

  window.util = {
    removeElementFromDom: removeElementFromDom,
    isEmptyArray: isEmptyArray,
    hideElement: hideElement,
  };

  function removeElementFromDom(element) {
    element.parentNode.removeChild(element);
  }

  function isEmptyArray(array) {
    if (!array || array.length === 0) {
      return true;
    }
    return false;
  }

  function hideElement(element) {
    element.classList.add('hidden');
  }
}
)();
