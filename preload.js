const path = require('path');
const url = require('url');
const { ipcRenderer } = require('electron')
const customTitlebar = require('custom-electron-titlebar');
window.ipcRenderer = require('electron').ipcRenderer;

window.addEventListener('DOMContentLoaded', () => 
{

  const d = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#2f3241'),
    //icon: path.join(__dirname , "icon.png"),
    //icon: path.join(__dirname , "../../../assets/icon.png"),
    title:"test",
    minimizable:false,
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  ipcRenderer.on('Update-Menu',() =>{
    console.log('Update-Menu');
    d.refreshMenu()
  })

  ipcRenderer.on('title-updated-Client',(event, result) =>
  {
    console.log(result);
    d.updateTitle(result);
  })

  ipcRenderer.send('internet-connection',window.navigator.onLine ? "online" : "offline");

})



