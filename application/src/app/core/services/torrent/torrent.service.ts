import { Injectable } from '@angular/core';
import * as WebTorrent from 'webtorrent/webtorrent.min.js';
import { Torrent } from 'webtorrent';
import { Subject } from 'rxjs';
import { spawn } from 'child_process';
import { Agent } from 'https'
import axios from 'axios';

const testAddresses = [
  "0xCf56FdF19754164Dd213C6A21727800b38b03Ee4",
  "0xD06482fA5c454D9FC1c674B1C26476417E511CB2",
  "0x8d3686d81B7F984473a0488a617fB988E0489805",
  "0x1B6F0b661A31F80429feC3827327104eaC782d62",
  "0x2D3beFcdED8436213Ae09755470d5836a86a7ad4",
  "0xB379921ef6c76E605E9A8F7955Ee0CC3bb191C8d",
  "0xb76d7746Dd807c32946A0578313Ae377EACfaF96",
  "0xcB7492aC58fea9276DfB3DBa079BCaEe481054A7",
  "0x7652AAE118E625aCcB495f9C7C122db5cCBD78f2",
  "0x1fe2c029A52eC494Be93C8f11d5944b8A9D45F5D",
  "0x29F05A0880F0c2721b414b85eB33f4fF57b11BDB",
  "0xA24cBc52c6cb1D07867aEE5D298E6022Bfe63e40",
  "0x3811a36F345F2639Ea205B86cD569732A71906E6",
  "0x68E18d1969bBd98e246f36Fc2A8ea456c1f0aF3C",
  "0x68E18d1969bBd98e246f36Fc2A8ea456c1f0aF3C",
];

@Injectable({
  providedIn: 'root'
})
export class TorrentService {
  downloadSubject: Subject<Torrent> = new Subject<Torrent>();
  uploads: Array<Torrent> = [];
  uploadsSubject: Subject<Torrent> = new Subject<Torrent>();

  client: any;

  constructor() {
    this.client = new WebTorrent();
  }

  add(torrentId: String) {
    this.client.add(torrentId,  (torrent: Torrent) => this._addDownload(torrent) );
  }

  addToUploads(torrent: Torrent) {
    this.uploadsSubject.next(torrent);
  }

  uploadFile(file) {
    this.client.seed(file, {name: file.name}, (torrent: Torrent) => {
      alert(`New Magnet URI: ${torrent.magnetURI}`);
      this.addToUploads(torrent)
    });
  }

  private _addDownload(download) {
    this.downloadSubject.next(download);
  }

  rewardPeers(peers: Array<String>) {;
    const instance = axios.create({
      httpsAgent: new Agent({  
        rejectUnauthorized: false
      }),
    });
    const encriptionPromises = [];
    peers.forEach((peerId, index) => {
      const object = {address: testAddresses[index], peer_id: peerId};
      const json = JSON.stringify(object);
      encriptionPromises.push(this.encriptJSON(json));
    });

    Promise.all(encriptionPromises).then((responses) => {
      for(let i = 0; i < responses.length; i++) {
        const request = responses[i].substring(1,responses[i].length - 2);
        debugger;
        instance.post('http://40.117.47.135:8002/api/contract/start', {
          publicKey:"a8 6b d1 f6 1c e2 18 b0 a6 3d c2 76 c3 53 a9 b0 1c 53 38 48 03 f3 7a 19 b7 a7 68 03 af 77 56 2d 4d ba db 7d aa 86 ca fb 7e 38 5a d5 cd d4 a7 99 7b 61 2a db 04 78 30 61 e6 fc d5 55 ee 01 8b 13",
          contractName:"ethtorrentee.py",
          methodName:"add_peer_address",
          data: request,
          params: {"a":"3"},
          header: {"user" : "text"},
          contentTransferEncoding: "base64",
          code : ""
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  }
  
  encriptJSON(json: string) {
    const defer = require('defer-promise');
    const deferred = defer();
    
    function returnValue(value) {
      deferred.resolve(value.toString());
    }
    const process = spawn('python', ['src/genRequest.py', json]);

    process.stdout.on(
      'data',
      returnValue,
    );

    return deferred.promise;
  }

  decryptRes(str: string) {
    const defer = require('defer-promise');
    const deferred = defer();
    
    function returnValue(value) {
      deferred.resolve(value.toString());
    }
    const process = spawn('python', ['src/genRequest.py', str]);

    process.stdout.on(
      'data',
      returnValue,
    );

    return deferred.promise;
  }
  
}
