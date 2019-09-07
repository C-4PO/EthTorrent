import { Injectable } from '@angular/core';
import Squarelink from 'squarelink'
import Web3 from 'web3'

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcMain, ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

const sqlk = new Squarelink('9c5ff661e4a70e87f55e', 'ropsten')

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcMain: typeof ipcMain;
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron() {
    return window && window.process && window.process.type;
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.ipcMain = window.require('electron').ipcMain;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }
}
