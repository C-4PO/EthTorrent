import { Component, OnInit, ViewChild } from '@angular/core';
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
  magnet: FormControl = new FormControl('magnet:?xt=urn:btih:c9e15763f722f23e98a29decdfae341b98d53056&dn=Cosmos+Laundromat&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fcosmos-laundromat.torrent');
  @ViewChild('file', {static: true}) file;
  fund: FormControl = new FormControl('');
  balance: number;
  address: String;
  constructor(private torrentService: TorrentService, private walletService: WalletService) {
    const address = localStorage.getItem('address');
    if (address) {
      this.address = address;
      this.walletService.localGetBalance(address).then((balance) => {
        this.balance = balance;
      });
    } else {
      window.addEventListener("message", (message) => {
        if (message.data.isWallet) {
          debugger;
          this.address = message.data.address;
          this.balance = message.data.balance;
        }
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

  submitFile() {
    if (this.file.nativeElement.files.length) {
      const file = this.file.nativeElement.files[0];
      this.torrentService.uploadFile(file);
    }
  }

  clearFile() {
    this.file.nativeElement.value = null;
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

  copyAddress() {
    navigator.clipboard.writeText(this.address.toString());
  }

  withdrawal() {
    this.walletService.withdrawal();
  }

  sendFund() {
    const fund = this.fund.value;
    if (fund && this.walletService.balance >= fund) {
      this.walletService.fund(fund);
    }
  }

}
