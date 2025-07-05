import { app, BrowserWindow, nativeImage, shell } from 'electron';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storageFile = path.join(app.getPath('userData'), 'cloud-reader-book-id.json');

function getInitialPathOrQuery() {
    try {
        if (fs.existsSync(storageFile)) {
            const data = fs.readFileSync(storageFile, 'utf8');
            // return query string based on stored book id
        }
    } catch (error) {
        console.error('Error loading progress:', error);
    }
    return '/kindle-library';
}

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

    win.webContents.on('did-navigate', (event, url) => {
        console.log(`Did navigate to: ${url}`);
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
                    console.log(`URL changed to: ${currentUrl}`);

                    if (currentUrl.includes('?asin=')) {
                        try {
                            // https://read.amazon.com/kindle-library
                            // https://read.amazon.com/?asin=B08CHMDKW2&ref_=kwl_kr_iv_rec_2
                            const urlObj = new URL(currentUrl);
                            const bookId = urlObj.searchParams.get('asin');
                            console.log(`Book ID: ${bookId}`);

                        } catch (error) {
                            console.error('Error parsing URL:', error);
                        }
                    }
                }
            })
            .catch(error => {});
    }, 1000);

    win.on('closed', () => {
        clearInterval(urlCheckInterval);
    });

    win.loadURL(baseUrl + getInitialPathOrQuery());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
