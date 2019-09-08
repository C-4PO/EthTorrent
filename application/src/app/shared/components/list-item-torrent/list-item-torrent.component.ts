import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

const MEGA_BYTE = 1000000;

@Component({
  selector: '[app-list-item-torrent]',
  templateUrl: './list-item-torrent.component.html',
  styleUrls: ['./list-item-torrent.component.scss'],
  host: {'class': 'list-group-item'},
})
export class ListItemTorrentComponent implements OnInit {
  @Input() download: any;
  @Input() isUpload: boolean;
  @Output() onFinish: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('trackingInfo', {static: false}) box;

  isFailed: boolean = false;
  isSucceded: boolean = true;
  peerIds: Array<String> = [];

  constructor() { }

  ngOnInit() {
    this.trackTorrent();
  }

  get barWidth() {
    if (this.isUpload) {
      return `100%`;
    }
    if (this.box) {
      return `${this.download.progress * this.box.nativeElement.offsetWidth}px`;
    }
    return "0px";
  }

  get downloadMegabytes() {
    return (this.download.downloadSpeed / MEGA_BYTE).toFixed(2);
  }

  get uploadMegabytes() {
    return (this.download.uploadSpeed / MEGA_BYTE).toFixed(2);
  }

  trackTorrent() {
    if (!this.isUpload) {  
      this.download.on('done',() => {
        if (!this.isFailed) {
          this.emitTorrentFinished(true);
          this.isSucceded = true;
        }
      });
      this.download.on('error', () => {
        if (!this.isSucceded) {
          this.emitTorrentFinished(false);
          this.isFailed = true;
        }
      });
    }
  }

  emitTorrentFinished(isSuccess: boolean) {
    this.onFinish.emit({isSuccess, peerIds: this.download.wires.map((wire) => wire.peerId)});
  }

}
