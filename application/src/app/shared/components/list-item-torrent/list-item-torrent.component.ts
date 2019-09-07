import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Torrent } from 'webtorrent';

@Component({
  selector: '[app-list-item-torrent]',
  templateUrl: './list-item-torrent.component.html',
  styleUrls: ['./list-item-torrent.component.scss'],
  host: {'class': 'list-group-item'},
})
export class ListItemTorrentComponent implements OnInit {
  @Input() download: any;
  @ViewChild('trackingInfo', {static: false}) box;

  constructor() { }

  ngOnInit() {

  }

  get barWidth() {
    if (this.box) {
      return this.download.progress * this.box.nativeElement.offsetWidth;
    }
    return 0;
  }

}
