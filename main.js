import { app, BrowserWindow, nativeImage, shell } from 'electron';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storageFile = path.join(app.getPath('userData'), 'cloud-reader-data.json');
const baseDomains = ['amazon.com'];
const baseUrl = "https://read.amazon.com";

function isDomainAllowed(url) {
    try {
        const hostname = new URL(url).hostname;
        for (const baseDomain of baseDomains) {
            if (hostname === baseDomain || hostname.endsWith('.' + baseDomain)) {
                return true;
            }
        }
    } catch (e) {}
    return false;
}

function fetchAppData() {
    try {
        if (fs.existsSync(storageFile)) {
            const data = fs.readFileSync(storageFile, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error loading application data:', error);
    }

    return { location: '/kindle-library' }
}

function saveAppData(data) {
    try {
        fs.writeFileSync(storageFile, JSON.stringify(data, null, 2));
        console.log('Saved application data:', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving application data:', error);
    }
}

function resumeUrl() {
    const data = fetchAppData();
    return baseUrl + data.location;
}


function createWindow()
{
    const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/icon.png'));

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
        if (isDomainAllowed(url)) {
            return;
        }
        event.preventDefault();
        shell.openExternal(url).catch(error => {
            console.error('Failed to open external URL:', error);
        });
    });

    let lastUrl = '';
    const urlCheckInterval = setInterval(() => {
        if (win.isDestroyed()) {
            clearInterval(urlCheckInterval);
            return;
        }

        win.webContents.executeJavaScript('window.location.href', true)
            .then(currentUrl => {
                if (currentUrl !== lastUrl) {
                    lastUrl = currentUrl;
                    if (currentUrl.startsWith(baseUrl)) {
                        const location = currentUrl.slice(baseUrl.length);
                        const data = { location: location }
                        saveAppData(data);
                    }
                }
            })
            .catch(error => {});
    }, 1000);

    win.on('closed', () => {
        clearInterval(urlCheckInterval);
    });

    win.loadURL(resumeUrl());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
