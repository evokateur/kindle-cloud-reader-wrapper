# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Electron-based desktop wrapper for the Kindle Cloud Reader (https://read.amazon.com). The app creates a native desktop experience for reading Kindle books, with features like state persistence (remembers where you left off) and external link handling.

## Development Commands

- `npm start` - Run the app in development mode
- `npm run package` - Build distributable packages for macOS (.dmg) and Linux (.AppImage)
- `npm install` - Install dependencies

## Architecture

### Core Files
- `main.js` - Main Electron process with all application logic
- `package.json` - Contains build configuration for electron-builder

### Key Architecture Components

**Single-File Architecture**: The entire application logic is contained in `main.js` using ES modules.

**State Persistence**: The app saves the user's current location in the Kindle Cloud Reader to `cloud-reader-data.json` in the user data directory. This allows the app to restore the user's reading position when reopened.

**Security Model**: Uses Electron's security best practices:
- Sandbox mode enabled
- Context isolation enabled
- Node integration disabled
- Remote module disabled

**URL Handling**: 
- Internal navigation stays within the Amazon domain
- External links automatically open in the system default browser
- URL monitoring via periodic JavaScript execution to track location changes

**Window Management**: Creates a single BrowserWindow (1200x800) with auto-hide menu bar and custom icon handling for both macOS (.icns) and Linux (.png).

## Build Configuration

The electron-builder configuration in `package.json` supports:
- macOS: DMG packages with ICNS icons
- Linux: AppImage packages with PNG icons
- Output directory: `dist/`

## Template Usage

This codebase is designed to be easily adapted for other web applications. The main customization points are:
- Change `baseUrl` in `createWindow()` function
- Update app metadata in `package.json`
- Replace icons in `assets/` directory