import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletService } from '../core/services/wallet/wallet.service';

@Component({
  selector: 'app-recieved-wallet',
  templateUrl: './recieved-wallet.component.html',
  styleUrls: ['./recieved-wallet.component.scss']
})
export class RecievedWalletComponent implements OnInit {

  constructor(private route: ActivatedRoute, private walletService: WalletService) {
    this.route.queryParams.subscribe(params => {
      const accessToken = params['access_token'];
      this.walletService.initialize(accessToken).then(() => {
        window.close();
      });
    });
  }

  ngOnInit() { }

}
