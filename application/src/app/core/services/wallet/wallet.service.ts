import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  token: String;
  address: String;
  balance: number = null;

  constructor() {
    this.token = localStorage.getItem('token');
    this.address = localStorage.getItem('address');
    this.balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : null;
  }

  create() {
    if (this.balance === null) {
      const clientId = "c76d2361577b6d10fc12"
      const redirectUrl = "http%3A%2F%2Flocalhost%3A4200%2F%23%2Frecieved-wallet"
      const url = `https://app.squarelink.com/authorize?client_id=${clientId}&scope=[user,wallets:admin]&redirect_uri=${redirectUrl}&response_type=token`;
      window.open(url);
      return {};
    } else {
      return {
        token: this.token,
        address: this.address,
        balance: this.balance,
      }
    }
  }

  initialize(token: String) {
    const self = this;
    this.token = token;
    return axios.post('https://api.squarelink.com/wallet',{ access_token: token, name: `wallet-${Math.random().toString(36).substring(7)}` }).then((res) => {
      this.address = res.data.wallet.address;
      return this.refresh(this.address);
    }).then((res) => {
      localStorage.setItem('token', self.token.toString());
      localStorage.setItem('address', self.address.toString());
      localStorage.setItem('balance', res.data.ETH.balance.toString());
      window.opener.postMessage({
        isWallet: true,
        token: self.token,
        address: self.address,
        balance: res.data.ETH.balance,
      }, '*');
    }).catch((error) => {
      window.opener.postMessage({
        isWallet: true,
        token: null,
        address: null,
        balance: null,
      }, '*');
    });
  }

  refresh(address) {
    const getBalanceUrl = `http://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`;
    return axios.get(getBalanceUrl);
  }

  localGetBalance(address) {
    this.address = address;
    return this.refresh(address).then(res => {
      return res.data.ETH.balance;
    });
  }
}
