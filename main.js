import { app, BrowserWindow, nativeImage, shell } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow()
{
    const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/icon.png'));
    const appUrl = "https://read.amazon.com";

    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon,
        autoHideMenuBar: true,
        title: "Kindle Cloud Reader",
        webPreferences: {
            sandbox: true,
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false
        },
    });

    win.webContents.setWindowOpenHandler((details) => {
        try {
            const url = new URL(details.url);
            if (url.protocol == 'http:' || url.protocol == 'https:') {
                shell.openExternal(details.url);
            }
        } catch (error) {}

        return { action: "deny" };
    });

    win.webContents.on('will-navigate', (event, url) => {
        if (!url.startsWith(appUrl)) {
            event.preventDefault();
        }
    });

    win.loadURL(appUrl);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
