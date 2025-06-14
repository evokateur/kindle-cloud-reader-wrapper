# Yahoo! Mail PWA Wrapper

This is an PWA wrapper for [Yahoo! Mail](https://mail.yahoo.com),
built using [Electron](https://www.electronjs.org/). It provides a native
macOS-style desktop experience for reading your Yahoo! mail in a standalone window.

---

## Features

- Opens [https://mail.yahoo.com](https://mail.yahoo.com) in a clean desktop app
- Resizable window with macOS-native look and feel
- Auto-hide menu bar for a minimalist reading experience
- Cross-platform potential (macOS, Windows, Linux)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/kindle-cloud-reader-wrapper.git
cd kindle-cloud-reader-wrapper
git checkout yahoo-mail
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
