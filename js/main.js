'use strict';

(function () {
  window.resetAppToDefault = resetAppToDefault;

  resetAppToDefault();

  function resetAppToDefault() {
    window.toggleForms(true);
    window.resetMapToDefault();
  }
})();

