import { Injectable } from '@angular/core';
import * as WebTorrent from 'webtorrent/webtorrent.min.js';
import { Torrent } from 'webtorrent';
import { Subject } from 'rxjs';

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
    console.log("heyey", this.client);
  }

  add(torrentId: String) {
    
    this.client.add(torrentId,  (torrent: Torrent) => this._addDownload(torrent) );
  }

  serializeTorrent(torrent: Torrent) {
    const buffers: Array<Buffer> = [];
    // torrent.files.for
  }

  private _addDownload(download) {
    console.log(download);
    this.downloadSubject.next(download);
  }
}
