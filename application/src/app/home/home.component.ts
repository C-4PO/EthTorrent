import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TorrentService } from '../core/services/torrent/torrent.service';
import { WalletService } from '../core/services/wallet/wallet.service';
import { Torrent } from 'webtorrent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  downloads: Array<Torrent> = [];
  uploads:  Array<Torrent> = [];
  magnet: FormControl = new FormControl('');
  balance: number;
  constructor(private torrentService: TorrentService, private walletService: WalletService) {
    const address = localStorage.getItem('address');
    if (address) {
      this.walletService.localGetBalance(address).then((balance) => {
        this.balance = balance;
      });
    } else {
      window.addEventListener("message", (message) => {
        this.balance = this.balance !== null ? this.balance : message.data.balance;
      });
    }
  }

  ngOnInit() {
    this.torrentService.downloadSubject.subscribe((torrent: Torrent) => {
      this.downloads.push(torrent);
    });
    this.torrentService.uploadsSubject.subscribe((torrent: Torrent) => {
      this.uploads.push(torrent);
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

  finishTorrent(options: any, torrent: Torrent) {
    if (options.isSuccess) {
      if (this.downloads.indexOf(torrent) > -1) {
        this.downloads.splice(this.downloads.indexOf(torrent),1);
        this.torrentService.addToUploads(torrent);
        this.torrentService.rewardPeers(options.peerIds);
      }
    }
  }

  createWallet() {
    const { balance } = this.walletService.create();
    if (balance !== undefined || balance !== null) {
      this.balance = balance;
    }
  }
}
