function fund(){

web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString();



Contract.fund(0, { from: address, value: '10000000000000' })
 .then(function (txHash) {
 console.log('Transaction sent')
 console.dir(txHash)
 waitForTxToBeMined(txHash)
 })

 })

}

function withdraw() {
  web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString();



  Contract.withdraw({from: address})
   .then(function (txHash) {
   console.log('Transaction sent')
   console.dir(txHash)
   waitForTxToBeMined(txHash)
   })

   })
}


async function waitForTxToBeMined (txHash) {
 let txReceipt
 while (!txReceipt) {
 try {
 txReceipt = await eth.getTransactionReceipt(txHash)
 } catch (err) {
 return indicateFailure(err)
 }
 }
 indicateSuccess()
}
