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

}
