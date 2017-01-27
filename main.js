const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')
const url = require('url')
var WebSocket = require('ws')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow (width, height) {
  // Create the browser window.
  win = new BrowserWindow({width: width, height: height, frame: false, resizable: true})
  win.setPosition(0, 0)
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  var ws = WebSocket("ws://localhost:8888/zwm")

  ws.on('open', function() {
    console.log("connected")
  })

  ws.on('message', function(data, flags) {
    var type = data.substring(0, 1)
    var msg = data.substring(1, data.length).trim()
    console.log(data)
    console.log(type)
    console.log(msg)
  })

  var {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  height = 20
  createWindow(width, height)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.