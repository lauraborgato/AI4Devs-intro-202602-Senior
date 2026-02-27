/**
 * String Reverser — Pure Logic Module
 * Shared between browser (index.html) and Jest tests.
 */

function reverseString(str) {
    return str.split("").reverse().join("");
  }

  function shouldEnableButton(value) {
    return value.length >= 3;
  }

  // Export for Node/Jest — in the browser these are globals via <script>
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { reverseString, shouldEnableButton };
  }
