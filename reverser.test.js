/**
 * String Reverser — Jest Test Suite
 * Written FIRST following TDD methodology.
 */

const { reverseString, shouldEnableButton } = require("./reverser");

// ── reverseString() ─────────────────────────────────────────────
describe("reverseString", () => {
  test("reverses 'AI4Devs' → 'sveD4IA'", () => {
    expect(reverseString("AI4Devs")).toBe("sveD4IA");
  });

  test("reverses '123' → '321'", () => {
    expect(reverseString("123")).toBe("321");
  });

  test("reverses 'hello' → 'olleh'", () => {
    expect(reverseString("hello")).toBe("olleh");
  });

  test("returns empty string for empty input", () => {
    expect(reverseString("")).toBe("");
  });

  test("reverses 'hello, i am a test' → 'tset a ma i ,olleh'", () => {
    expect(reverseString("hello, i am a test")).toBe("tset a ma i ,olleh");
  });

  test("handles single character", () => {
    expect(reverseString("a")).toBe("a");
  });

  test("handles palindrome", () => {
    expect(reverseString("racecar")).toBe("racecar");
  });

  test("handles special characters", () => {
    expect(reverseString("!@#$")).toBe("$#@!");
  });

  test("handles unicode characters", () => {
    expect(reverseString("naïve")).toBe("evïan");
  });
});

// ── shouldEnableButton() ────────────────────────────────────────
describe("shouldEnableButton", () => {
  test("returns false for empty string", () => {
    expect(shouldEnableButton("")).toBe(false);
  });

  test("returns false for 1-char input", () => {
    expect(shouldEnableButton("a")).toBe(false);
  });

  test("returns false for 2-char input", () => {
    expect(shouldEnableButton("ab")).toBe(false);
  });

  test("returns true for 3-char input (minimum valid)", () => {
    expect(shouldEnableButton("abc")).toBe(true);
  });

  test("returns true for long input", () => {
    expect(shouldEnableButton("hello world")).toBe(true);
  });

  test("counts spaces as characters", () => {
    expect(shouldEnableButton("a b")).toBe(true);
  });
});

// ── DOM Integration Tests ───────────────────────────────────────
describe("DOM integration", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="input" type="text" />
      <button id="reverseBtn" disabled>Reverse</button>
      <div id="result"></div>
      <button id="copyBtn" class="hidden">Copy</button>
      <div id="toast" class="hidden"></div>
    `;

    // Load script.js by evaluating it in this DOM context
    jest.resetModules();
    require("./script");

    // Manually fire DOMContentLoaded since jsdom won't re-fire it
    document.dispatchEvent(new Event("DOMContentLoaded"));
  });

  test("reverse button is disabled when input is empty", () => {
    const btn = document.getElementById("reverseBtn");
    expect(btn.disabled).toBe(true);
  });

  test("reverse button is disabled when input has fewer than 3 chars", () => {
    const input = document.getElementById("input");
    const btn = document.getElementById("reverseBtn");

    input.value = "ab";
    input.dispatchEvent(new Event("input"));

    expect(btn.disabled).toBe(true);
  });

  test("reverse button is enabled when input has 3+ chars", () => {
    const input = document.getElementById("input");
    const btn = document.getElementById("reverseBtn");

    input.value = "abc";
    input.dispatchEvent(new Event("input"));

    expect(btn.disabled).toBe(false);
  });

  test("clicking reverse shows the reversed string in #result", () => {
    const input = document.getElementById("input");
    const btn = document.getElementById("reverseBtn");
    const result = document.getElementById("result");

    input.value = "hello";
    input.dispatchEvent(new Event("input"));
    btn.click();

    expect(result.textContent).toBe("olleh");
  });

  test("copy button becomes visible after reversal", () => {
    const input = document.getElementById("input");
    const btn = document.getElementById("reverseBtn");
    const copyBtn = document.getElementById("copyBtn");

    input.value = "hello";
    input.dispatchEvent(new Event("input"));
    btn.click();

    expect(copyBtn.classList.contains("hidden")).toBe(false);
  });

  test("result clears when input is emptied", () => {
    const input = document.getElementById("input");
    const btn = document.getElementById("reverseBtn");
    const result = document.getElementById("result");

    input.value = "hello";
    input.dispatchEvent(new Event("input"));
    btn.click();
    expect(result.textContent).toBe("olleh");

    input.value = "";
    input.dispatchEvent(new Event("input"));
    expect(result.textContent).toBe("");
  });

  test("copy button hides when input is cleared", () => {
    const input = document.getElementById("input");
    const btn = document.getElementById("reverseBtn");
    const copyBtn = document.getElementById("copyBtn");

    input.value = "hello";
    input.dispatchEvent(new Event("input"));
    btn.click();

    input.value = "";
    input.dispatchEvent(new Event("input"));
    expect(copyBtn.classList.contains("hidden")).toBe(true);
  });

  test("Enter key triggers reversal when input is valid", () => {
    const input = document.getElementById("input");
    const result = document.getElementById("result");

    input.value = "AI4Devs";
    input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(result.textContent).toBe("sveD4IA");
  });

  test("Enter key does not trigger reversal when input is too short", () => {
    const input = document.getElementById("input");
    const result = document.getElementById("result");

    input.value = "ab";
    input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(result.textContent).toBe("");
  });
});