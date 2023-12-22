const { app, BrowserWindow } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule:true
    }
  })
  //win.loadURL('http://localhost:3000')
  win.loadFile('./out1/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})