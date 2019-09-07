import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TorrentService } from '../core/services/torrent/torrent.service';
import { Torrent } from 'webtorrent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  downloads: Array<Torrent> = [];
  magnet = new FormControl('');
  constructor(private torrentService: TorrentService) {}

  ngOnInit() {
    this.torrentService.downloadSubject.subscribe((torrent: Torrent) => {
      this.downloads.push(torrent);
    });
  }

  submitMagnet() {
    const magnetURI = this.magnet.value;
    if (magnetURI) {
      this.torrentService.add(magnetURI);
      this.clearMagnet();
    }
  }

  clearMagnet() {
    this.magnet.setValue('');
  }

  finishTorrent(isSuccess: boolean ,torrent: Torrent) {
    if (isSuccess) {
      this.torrentService.serializeTorrent(torrent);
    }
  }

  createWallet() {
    // open squarelink api call in a new window
    const clientId = "c76d2361577b6d10fc12"
    const redirectUrl = "http://localhost:4200/"
    const url = "https://app.squarelink.com/authorize?client_id=" + clientId + "&scope=[user,wallets:admin]&redirect_uri="+ redirectUrl + "&response_type=token"
    window.location.replace(url)
    
    const token = window.location.href.split("?")[1].split("=")[1].split("&")[0]
    
    const axios = require('axios')
    axios.post('https://api.squarelink.com/wallet',{
      access_token: token
    }).then((res) => {
      console.log(res)
      const getBalanceUrl = "http://api.ethplorer.io/getAddressInfo/" + res.address + "?apiKey=freekey"
      // {"address":"0x9afcddf5ade14065a491917a6d9e8fe94121c98e","ETH":{"balance":0},"countTxs":0}
      window.open(getBalanceUrl, '_blank')
    })
    .catch((error) => {
      console.error(error)
    })

  }
}
