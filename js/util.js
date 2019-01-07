'use strict';

(function () {
  window.removeElementFromDom = removeElementFromDom;
  window.isEmptyArray = isEmptyArray;

  function removeElementFromDom(element) {
    element.parentNode.removeChild(element);
  }

  function isEmptyArray(array) {
    if (!array || array.length === 0) {
      return true;
    }
    return false;
  }
}
)();
