const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const fs = require('fs')

let win;

function openRootFolder() {
  dialog.showOpenDialog({properties: ['openDirectory']}).then(result => {
    console.log(result.filePaths);
    fs.readdir(result.filePaths[0], (err, files) => {
      var path = result.filePaths[0];
      console.log(files);
      files.forEach((item, i) => {
        abspath = console.log(path+'\\'+item);
        split = [item];
        console.log(split);
      });
      win.webContents.send("test", "hello");

    });

  })
}

function createWindow () {
  win = new BrowserWindow({
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
            openRootFolder();
          }
        },
        {role: 'reload',
        accelerator: 'Ctrl+R'
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
