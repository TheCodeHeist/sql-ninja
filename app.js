"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");
const server = require("./src/server");

console.clear();
console.log("Starting server...");
server.listen(12345);

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1500,
    height: 1000,
    frame: false,
    icon: __dirname + "/src/public/img/logo_rnd.png",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win.loadURL(`http://localhost:12345`);
}

app.whenReady().then(createWindow);

ipcMain.on("close-window", () => {
  console.log("Closing window...");
  win.close();
});

ipcMain.on("minimize-window", (event, args) => {
  win.minimize();
});

ipcMain.on("maximize-unmaximize-window", () => {
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
