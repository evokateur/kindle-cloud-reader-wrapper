const { app, BrowserWindow, nativeImage, shell } = require('electron');
const path = require('path');

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
        },
    });

    win.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    win.loadURL("https://read.amazon.com");
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
