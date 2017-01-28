const electron = require('electron')

const {ipcRenderer} = electron

ipcRenderer.on('spaces', (event, arg) => {
	console.log(arg)
	document.getElementById('spaces').innerHTML = arg
})

ipcRenderer.send('connect')
