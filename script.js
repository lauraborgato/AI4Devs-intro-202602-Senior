/**
 * String Reverser — DOM Controller
 * Pure logic imported from reverser.js (loaded before this file in index.html).
 */

// Allow require in Node/Jest test environment
if (typeof require !== "undefined" && typeof reverseString === "undefined") {
  const mod = require("./reverser");
  globalThis.reverseString = mod.reverseString;
  globalThis.shouldEnableButton = mod.shouldEnableButton;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const reverseBtn = document.getElementById("reverseBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resultEl = document.getElementById("result");
  const toast = document.getElementById("toast");

  // ── State management ──────────────────────────────────────────
  function updateButtonState() {
    const enabled = shouldEnableButton(input.value);
    reverseBtn.disabled = !enabled;

    if (!enabled) {
      resultEl.textContent = "";
      copyBtn.classList.add("hidden");
    }
  }

  function handleReverse() {
    const reversed = reverseString(input.value);
    resultEl.textContent = reversed;
    copyBtn.classList.remove("hidden");

    // Trigger pop animation
    resultEl.classList.remove("pop-in");
    void resultEl.offsetWidth;
    resultEl.classList.add("pop-in");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(resultEl.textContent);
      showToast("Copied to clipboard!");
    } catch {
      // Fallback for older browsers / non-HTTPS
      const textarea = document.createElement("textarea");
      textarea.value = resultEl.textContent;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showToast("Copied to clipboard!");
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden", "toast-out");
    toast.classList.add("toast-in");

    setTimeout(() => {
      toast.classList.replace("toast-in", "toast-out");
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, 1800);
  }

  // ── Event listeners ───────────────────────────────────────────
  input.addEventListener("input", updateButtonState);
  reverseBtn.addEventListener("click", handleReverse);
  copyBtn.addEventListener("click", handleCopy);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && shouldEnableButton(input.value)) {
      handleReverse();
    }
  });

  // Initial state
  updateButtonState();
});