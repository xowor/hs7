var RDT = require('electron-devtools-installer')
console.log(RDT);

// import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
//
///*installExtension*/
RDT.default(RDT.REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
RDT.default(RDT.REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

require('electron-context-menu')({
  prepend: params => [{
      label: 'Rainbow',
      // only show it when right-clicking images
      visible: params.mediaType === 'image'
  }]
});

const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 768,
    title: "HS7",
    frame: false,
    resizable: true,
    // transparent: true,
  })

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/dist/electron/index.html`)
  // win.maximize()

  win.setMenu(null);

  // Open the DevTools.
  win.webContents.openDevTools()

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
app.on('ready', createWindow)

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
