const { app, BrowserWindow } = require ('electron')

require('@electron/remote/main').initialize()

const createWindow = () => {
    // Create the browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: true
        }
    })

    win.loadURL('http://localhost:3000')

    // Install React Dev Tools
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
        console.log(`Added Extension:  ${name}`);
    })
        .catch((err) => {
            console.log('An error occurred: ', err);
        });
}

app.on('ready', createWindow)

// Quit when all windows are closed
app.on('window-all-closed', () => {
    // On OS X it is common for application and their menu bar
    // to stay active until the user quits explicitly with cmd + Q
    if(process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    // On OS X it is common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})