'use strict';

const {app, BrowserWindow, Menu} = require('electron');
let mainWindow;
let commentWindow;

// メニュー
let mainMenuTemplate = [{
  label: 'Hedgehogs',
  submenu: [
    { label: '画面最大化',
    accelerator: 'CommandOrControl+F',
    click: function() {
      mainWindow.maximize();
    }},
    { type: 'separator'},
    { label: '画面を通常の大きさに戻す',
    accelerator: 'Shift+CommandOrControl+F',
    click: function() {
      mainWindow.unmaximize();
    }},
    { type: 'separator'},
    { label: '画面を表示',
    accelerator: 'CommandOrControl+S',
    click: function() {
      mainWindow.show();
    }},
    { type: 'separator'},
    { label: 'コメント画面表示',
    accelerator: 'CommandOrControl+C',
    click: function() {
      showCommentWindow();
    }},
    { type: 'separator'},
    { label: '閉じる',
    accelerator: 'CommandOrControl+Q',
    click: function() {
      app.quit();
    }},
  ]
}];

// メニュー
let commentMenuTemplate = [{
  label: 'Hedgehogs',
  submenu: [
    { label: '画面最大化',
    accelerator: 'CommandOrControl+F',
    click: function() {
      mainWindow.maximize();
    }},
    { type: 'separator'},
    { label: '画面を通常の大きさに戻す',
    accelerator: 'Shift+CommandOrControl+F',
    click: function() {
      mainWindow.unmaximize();
    }},
    { type: 'separator'},
    { label: '画面を表示',
    accelerator: 'CommandOrControl+S',
    click: function() {
      mainWindow.show();
    }},
    { type: 'separator'},
    { label: 'メイン画面表示',
    accelerator: 'CommandOrControl+C',
    click: function() {
      createMainWindow();
    }},
    { type: 'separator'},
    { label: '閉じる',
    accelerator: 'CommandOrControl+Q',
    click: function() {
      app.quit();
    }},
  ]
}];

let mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
let commentMenu = Menu.buildFromTemplate(commentMenuTemplate);

// コメント弾幕が流れるメイン画面
function createMainWindow () {
  Menu.setApplicationMenu(mainMenu);

  mainWindow = new BrowserWindow({
    // "fullscreen": true,
    // "itleBarStyle": "hidden",
    "transparent": true,
    "alwaysOnTop": true,
    "nodeIntegration": false,
    "fullscreenable":false,
    "frame":false
  });
  // mainWindow.setTitle('Hedgehogs');

  // デベロッパーツール
  // mainWindow.webContents.openDevTools();
  if (commentWindow) {
    commentWindow.hide();
  }
  

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null
  });

}

// コメントログやコメントグラフの画面
function showCommentWindow () {
  Menu.setApplicationMenu(commentMenu);
  commentWindow = new BrowserWindow({
    // "fullscreen": true,
    // "itleBarStyle": "hidden",
    // "transparent": true,
    // "alwaysOnTop": true,
    // "nodeIntegration": false,
    // "fullscreenable":false,
    // "frame":false
  });
  commentWindow.loadURL(`file://${__dirname}/comment.html`);
  commentWindow.show();
  commentWindow.webContents.openDevTools();
  mainWindow.hide();

  commentWindow.on('closed', () => {
    commentWindow = null
  });
}


app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});





