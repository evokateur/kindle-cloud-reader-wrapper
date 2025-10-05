const { app, BrowserWindow, nativeImage, shell } = require('electron');
const path = require('path');

const baseDomains = ['mail.yahoo.com', 'login.yahoo.com'];

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

function createWindow()
{
    const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/icon.png'));

    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon,
        autoHideMenuBar: true,
        title: "Yahoo! Mail",
        webPreferences: {
            sandbox: true,
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false
        },
    });

    win.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
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

    win.loadURL("https://mail.yahoo.com/n/inbox/priority");
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
