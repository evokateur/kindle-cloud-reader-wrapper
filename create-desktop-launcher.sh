#!/bin/bash

# Check if running on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "This script is for Linux systems only. On macOS, use the built .dmg package instead."
    exit 0
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_JSON="$SCRIPT_DIR/package.json"

# Check if package.json exists
if [ ! -f "$PACKAGE_JSON" ]; then
    echo "Error: package.json not found at $PACKAGE_JSON"
    exit 1
fi

# Check if jq is available
if ! command -v jq &>/dev/null; then
    echo "Error: jq is required but not installed"
    exit 1
fi

# Extract values from package.json
APPIMAGE_NAME=$(jq -r '.build.linux.artifactName' "$PACKAGE_JSON")
ICON_RELATIVE=$(jq -r '.build.linux.icon' "$PACKAGE_JSON")
PRODUCT_NAME=$(jq -r '.build.productName' "$PACKAGE_JSON")
DESCRIPTION=$(jq -r '.description' "$PACKAGE_JSON")
APP_NAME=$(jq -r '.name' "$PACKAGE_JSON")

APPIMAGE_PATH="$SCRIPT_DIR/dist/$APPIMAGE_NAME"
ICON_PATH="$SCRIPT_DIR/$ICON_RELATIVE"
DESKTOP_FILE="$HOME/.local/share/applications/$APP_NAME.desktop"

# Check if AppImage exists
if [ ! -f "$APPIMAGE_PATH" ]; then
    echo "Error: AppImage not found at $APPIMAGE_PATH"
    echo "Please build the application first."
    exit 1
fi

# Check if icon exists
if [ ! -f "$ICON_PATH" ]; then
    echo "Error: Icon not found at $ICON_PATH"
    exit 1
fi

# Create applications directory if it doesn't exist
mkdir -p "$(dirname "$DESKTOP_FILE")"

# Create the desktop file
cat >"$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=$PRODUCT_NAME
Comment=$DESCRIPTION
Exec=$APPIMAGE_PATH
Icon=$ICON_PATH
Terminal=false
Type=Application
Categories=Education;Office;
StartupWMClass=$APP_NAME
EOF

# Make the desktop file executable
chmod +x "$DESKTOP_FILE"

echo "Desktop launcher created at: $DESKTOP_FILE"
echo "The application should now appear in your application menu."

