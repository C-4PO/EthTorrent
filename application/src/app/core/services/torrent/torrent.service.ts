import { Injectable } from '@angular/core';
import * as WebTorrent from 'webtorrent/webtorrent.min.js';
import { Torrent } from 'webtorrent';
import { Subject } from 'rxjs';
import Crypto from 'crypo';
import axios from 'axios';
import * as fs from 'fs';

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
    console.log(torrent);
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

  rewardPeers(peers: Array<String>) {
    const requests = peers.map((peerId, index) => {
      const object = {address: testAddresses[index], peer_id: peerId};
      const json = JSON.stringify(object);
      const a128 = Crypto.encode('A128',json) + '\n';
      const base64 = window.btoa(a128);
      return base64;
    });

    requests.forEach((req) => {
      axios.post('https://40.117.47.135:8002/api/contract/start', {
        publicKey:"28 30 11 86 8a 69 d5 78 f2 75 50 b4 cc da c9 bc bc b1 19 d2 d9 0b ee f8 fb 1f c4 1a e4 17 6b 86 8f 16 9e d8 51 f8 15 a5 88 d9 58 a8 79 5b 5d 79 e2 b2 19 eb 65 6c a5 7d 57 ce 8a 9e 23 2e 07 b8",
        contractName:"ethtorrentee.py",
        methodName:"add_peer_address",
        data: req,
        params: {"a":"3"},
        header: {"user" : "text"},
        contentTransferEncoding: "base64",
        code : ""
      })
    });
  }
}
