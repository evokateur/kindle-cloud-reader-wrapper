# Kindle Cloud Reader Wrapper

A desktop app that embeds the [Kindle Cloud Reader](https://read.amazon.com),
built using [Electron](https://www.electronjs.org/). It provides a native desktop
experience for reading Kindle books on older,
[non-Metal Macs](https://chatgpt.com/share/6850764a-2418-8012-a04d-2d54a038e04e) as well as Linux.

![screenshot](./assets/screenshot.png)

## Disclaimer

This is an unofficial desktop wrapper for Amazon's Kindle Cloud Reader web interface. It is not affiliated with, endorsed by, or sponsored by Amazon. This tool simply provides a desktop application experience for the official Kindle Cloud Reader website (<https://read.amazon.com>) and is intended for users who cannot use the official Kindle applications due to system limitations.

Users must have valid Amazon accounts and Kindle book licenses to access content through this application.

---

## Features

- Opens [https://read.amazon.com](https://read.amazon.com) in a clean desktop window
- Preserves your session state (filters, current page, etc.) between app launches
- External links open in the default browser
- Can be built for macOS and Linux

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

To build for macOS (.app or .dmg) or Linux (.AppImage), run:

```bash
npm run package
```

Output will appear in the `dist/` directory.
See `package.json` → `build` for details.

## Using this code as a template

This code can be easily modified to create desktop wrappers for other web sites,
such as [Yahoo! Mail](https://github.com/evokateur/kindle-cloud-reader-wrapper/tree/yahoo-mail).
