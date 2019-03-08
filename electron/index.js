'use strict';

const {app, BrowserWindow, globalShortcut} = require('electron');
let win;

// メニュー

// const editMenu = [
//   {
//       label: 'Edit',
//       submenu: [
//           {
//             label: 'Comment ON',
//             // click: function() { comment = true; }
//           },
//           {
//             label: 'Comment OFF',
//             // click: function() { comment = false; }
//           },
//       ]
//   }
// ];

function createWindow () {

  win = new BrowserWindow({
    // "fullscreen": true,
    // "itleBarStyle": "hidden",
    "transparent": true,
    "alwaysOnTop": true,
    "nodeIntegration": false,
    "fullscreenable":false,
    "frame":false
  });
  // win.setTitle('Hedgehogs');

  // デベロッパーツール
  // win.webContents.openDevTools();

  // const menu = Menu.buildFromTemplate(editMenu);
  // Menu.setApplicationMenu(menu);

  win.loadURL(`file://${__dirname}/index.html`);
  shortcats()

  win.on('closed', () => {
    win = null
  });

}

// shortcats設定
function shortcats(){
  // max_size
  globalShortcut.register('CommandOrControl+F', () => {
    win.maximize()
  })
  // default sizeに戻す
  globalShortcut.register('Shift+CommandOrControl+F', () => {
    win.unmaximize()
  })
  // show
  globalShortcut.register('CommandOrControl+S', () => {
    win.show(); 
  })
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});





