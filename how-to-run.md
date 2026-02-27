# String Reverser

A responsive web app that reverses strings, built with **TDD** using **Jest** and styled with **Tailwind CSS**.

## Project Structure

```
string-reverser/
├── index.html          # Main web page (Tailwind CSS)
├── reverser.js         # Pure logic module (shared by browser & tests)
├── script.js           # DOM controller
├── reverser.test.js    # Jest test suite
├── package.json        # Node dependencies & scripts
└── README.md           # This file
```

## Prerequisites

- **Node.js** ≥ 16 and **npm** (for running tests)
- A modern web browser (for viewing the page)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. View the Web Page

Open `index.html` directly in your browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or use a local dev server for a better experience:

```bash
npx serve .
```

Then visit `http://localhost:3000`.

### 3. Run the Tests

```bash
npm test
```

This runs all Jest tests with verbose output. You should see output like:

```
 PASS  ./reverser.test.js
  reverseString
    ✓ reverses 'AI4Devs' → 'sveD4IA'
    ✓ reverses '123' → '321'
    ✓ reverses 'hello' → 'olleh'
    ✓ returns empty string for empty input
    ✓ reverses 'hello, i am a test' → 'tset a ma i ,olleh'
    ...
  shouldEnableButton
    ✓ returns false for empty string
    ✓ returns true for 3-char input (minimum valid)
    ...
  DOM integration
    ✓ reverse button is disabled when input is empty
    ✓ clicking reverse shows the reversed string in #result
    ...
```

### 4. Run Tests in Watch Mode

```bash
npm run test:watch
```

Tests re-run automatically whenever you save a file — useful during development.

## How It Works

| Feature | Description |
|---|---|
| **Input validation** | The "Reverse" button is disabled until the input has ≥ 3 characters. |
| **Reverse** | Clicking the button (or pressing Enter) reverses the string and displays it. |
| **Copy** | A copy button appears next to the result; clicking it copies to the clipboard. |
| **Responsive** | The layout adapts to all screen sizes using Tailwind CSS. |

## TDD Approach

Tests were written **before** the implementation code:

1. `reverser.test.js` — defines expected behavior for `reverseString()`, `shouldEnableButton()`, and DOM interactions.
2. `reverser.js` — pure functions created to make the unit tests pass.
3. `script.js` — DOM wiring created to make the integration tests pass.
4. `index.html` — styled UI layer on top.

## Tech Stack

- **HTML5** + **Tailwind CSS** (via CDN) — responsive UI
- **Vanilla JavaScript** — no frameworks needed
- **Jest 29** — test runner with built-in jsdom for DOM tests