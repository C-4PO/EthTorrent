import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Torrent } from 'webtorrent';

@Component({
  selector: '[app-list-item-torrent]',
  templateUrl: './list-item-torrent.component.html',
  styleUrls: ['./list-item-torrent.component.scss'],
  host: {'class': 'list-group-item'},
})
export class ListItemTorrentComponent implements OnInit {
  @Input() download: any;
  @Output() onFinish: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('trackingInfo', {static: false}) box;

  isFailed: boolean = false;
  isSucceded: boolean = true;

  constructor() { }

  ngOnInit() {
    this.trackTorrent();
    console.log('num peers', this.download.numPeers, this.download.maxWebConns);
  }

  get barWidth() {
    if (this.box) {
      return this.download.progress * this.box.nativeElement.offsetWidth;
    }
    return 0;
  }

  trackTorrent() {
    console.log(this.download.wires);

    this.download.on('wire', function (wire) {

      let ids:string[]
      if(JSON.parse(localStorage.getItem("ids"))==null){
        ids = Array()
      } else {
        ids = JSON.parse(localStorage.getItem("ids"));
      }

      ids.push(wire.peerId);

      localStorage.setItem("ids",JSON.stringify(ids))
    });

    this.download.on('done',() => {
      if (!this.isFailed) {
        this.emitTorrentFinished(true);
        this.isSucceded = true;
        console.log('num peers', this.download.numPeers, this.download.wires);

      }
    });
    this.download.on('error', () => {
      if (!this.isSucceded) {
        this.emitTorrentFinished(false);
        this.isFailed = true;
      }
    });
  }

  emitTorrentFinished(isFailed) {
    this.onFinish.emit(isFailed);
  }


}
