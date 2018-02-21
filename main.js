const electron = require('electron');
const url = require('url');
const path = require('path');
const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

const {app, BrowserWindow, Menu} = electron;
console.log('main');
let mainWindow;
//Listen for app to be ready
app.on('ready', function() {

  mainWindow = new BrowserWindow({
     icon: __dirname +"/img/icon.ico"
  });

  //Load html into windows
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slaches: true
  }));


  mainWindow.webContents.openDevTools();
  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
 
  //Insert menu
  Menu.setApplicationMenu(mainMenu);
});

//Create menu template

const mainMenuTemplate = [
  {
    label:'File',
    submenu: [
      {
        label: 'Open',
        accelerator: process.platform == 'darwin' ? 'Command+O' : 'Ctrl+O',
        click() {
        	ipc.on('open-file-dialog', function (event) {
               dialog.showOpenDialog({
                    properties: ['openFile', 'openDirectory'], function(files) {
                      if (files) event.sender.send('selected-directory', files)
                    }
               })
             })
        }
      },
      {
        label: 'Save',
        accelerator: process.platform == 'darwin' ? 'Command+S' : 'Ctrl+S',
        click() {
        }
       },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ],
  },
];