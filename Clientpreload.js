const path = require('path');
const url = require('url');
const { ipcRenderer } = require('electron')
const customTitlebar = require('custom-electron-titlebar');
window.ipcRenderer = require('electron').ipcRenderer;

window.addEventListener('DOMContentLoaded', () => 
{
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})



