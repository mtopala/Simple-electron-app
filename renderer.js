/*const electron = require('electron');
const ipc = require('electron').ipcRenderer;

const selectDirBtn = document.getElementById('select-directory');
console.log(selectDirBtn);
selectDirBtn.addEventListener('click', function (event) {
  ipc.send('open-file-dialog');
  var file = event.files[0];  
  var path = file.path;
});

ipc.on('selected-directory', function (event, path) {
   document.getElementById('ass').innerHTML = '${path}';
})    */