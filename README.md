# Kindle Cloud Reader (Unofficial Desktop Wrapper)

This is an **unofficial desktop wrapper** for [Kindle Cloud Reader](https://read.amazon.com), built using [Electron](https://www.electronjs.org/). It provides a native macOS-style desktop experience for reading your Kindle books in a standalone window.

![screenshot](./assets/screenshot.png)

---

## Features

- Opens [https://read.amazon.com](https://read.amazon.com) in a clean desktop app
- Resizable window with macOS-native look and feel
- Auto-hide menu bar for a minimalist reading experience
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

Output will appear in the `dist/` directory. See `package.json` → `build` for config details.

---

### Disclaimer

This project is an unofficial wrapper around the Kindle Cloud Reader provided by Amazon. It is intended for personal use only to enable a native desktop experience on older machines that can no longer run the official Kindle Reader app.

This project is not affiliated with, endorsed by, or connected to Amazon.com, Inc. or any of its subsidiaries.
All trademarks and copyrights related to Kindle, Amazon, and their associated services belong to their respective owners.

No content is stored, modified, or redistributed by this application — it merely opens the [official web application](https://read.amazon.com) inside a standalone Electron window.

If you are an Amazon representative and have concerns about this repository, please open an issue or contact the maintainer directly.

---

### License

This project is licensed under the [MIT License](https://mit-license.org/).
This license applies only to the code in this repository, not to any content or service provided by Amazon.

---

### Credits

- built with [Electron](https://www.electronjs.org/)
- Icon generated with AI assistance for personal use (not affiliated with Amazon)
