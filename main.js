const { app, BrowserWindow, Menu, dialog } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 1500,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: 'Root Folder',
      submenu: [
        {label: 'Open folder',
          accelerator: 'CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog({properties: ['openDirectory']}).then(result => {
              console.log(result.filePaths);
            })
          }
        },
        {type: 'separator'},
        {label: 'exit',
        accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  win.loadFile('main.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
