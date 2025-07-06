# Kindle Cloud Reader PWA Wrapper

This is a PWA wrapper for [Kindle Cloud Reader](https://read.amazon.com),
built using [Electron](https://www.electronjs.org/). It provides a native
macOS-style desktop experience for reading Kindle books on [older, non-Metal Macs](https://chatgpt.com/share/6850764a-2418-8012-a04d-2d54a038e04e).
Links that open in a new window will open in your default browser.

![screenshot](./assets/screenshot.png)

---

## Features

- Opens [https://read.amazon.com](https://read.amazon.com) in a clean desktop app
- Minimalist resizable window with macOS-native look and feel
- Mimics the Kindle app by starting in view state it was in when last closed
- Cross-platform potential (macOS, Windows, Linux)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/kindle-cloud-reader-wrapper.git
cd kindle-cloud-reader-wrapper
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm start
```

### 4. Packaging the app

To build a macOS app (.app or .dmg):

```bash
npm run package
```

Output will appear in the `dist/` directory.
See `package.json` → `build` for config details.

## Using this code as a template

This code can be easily modified to create PWAs for other web sites,
such as [Yahoo! Mail](https://github.com/evokateur/kindle-cloud-reader-wrapper/tree/yahoo-mail).
