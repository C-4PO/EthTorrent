let ethers = require('ethers')


let o = 1000
let addresses = new Array()
while(o-->0){
  let wallet = ethers.Wallet.createRandom();
  addresses.push(wallet.address)
}

console.log(addresses)
