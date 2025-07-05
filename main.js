import { app, BrowserWindow, nativeImage, shell } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow()
{
    const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/icon.png'));
    const baseUrl = "https://read.amazon.com";
    const baseDomain = new URL(baseUrl).hostname.split('.').slice(-2).join('.');

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
        const urlDomain = new URL(url).hostname.split('.').slice(-2).join('.');
        if (!(urlDomain === baseDomain || urlDomain.endsWith('.' + baseDomain))) {
            event.preventDefault();
            shell.openExternal(url).catch(error => {
                console.error('Failed to open external URL:', error);
            });
        }
    });

    win.loadURL(baseUrl + '/kindle-library');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
