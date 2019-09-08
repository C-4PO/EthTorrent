var provider;
var _ethers;
var signer;

var Contract
var ContractAddress = "0x91A9709D96cf79420F12E01AC23dD779eAd97bFF"
var ABI = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "seederRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addTorrent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "torrents",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "bountyPool",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_seeder",
				"type": "address"
			}
		],
		"name": "getWithdrawable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_torrentID",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "_seeders",
				"type": "address[]"
			}
		],
		"name": "rewardSeeders",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_torrentID",
				"type": "uint256"
			}
		],
		"name": "fund",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "torrentAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "seeder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "rewarded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_torrentID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "funded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "seeder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawn",
		"type": "event"
	}
]

async function enableEthereum() {
	await ethereum.enable()
}

async function initialize(provider){

  ethereum.enable()

  provider = new ethers.providers.Web3Provider(web3.currentProvider);

  let accounts = await provider.listAccounts()

  signer = provider.getSigner(accounts[0])

  Contract = new ethers.Contract(ContractAddress,ABI,signer)

  await getBalance()
	
  await getWithdrawable()
}

async function addTorrent(){
	let name = document.getElementById("torrentName").value;
	await Contract.addTorrent(name)
}

async function rewardSeeders() {
	let torrentID = document.getElementById("rewardTorrentID").value
	let seederArrayString = document.getElementById("seederArrayString").value
  let seederArray = parseStrToArr(seederArrayString)
  await Contract.rewardSeeders(torrentID,seederArray)
}

async function fundTorrent(){
  let torrentID = document.getElementById("fundTorrentID").value
  let amount = document.getElementById("fundAmount").value
  let overrides = {
    value:ethers.utils.parseEther(amount)
  }
  await Contract.fund(torrentID,overrides)
}

async function withdraw(){
  await Contract.withdraw()
}

async function getWithdrawable(){
  let withdrawable = await Contract.getWithdrawable(signer._address)
  withdrawable = ethers.utils.formatUnits(withdrawable,18)
  document.getElementById("withdrawable").innerHTML = "Withdrawable: " + withdrawable + " ETH"
}

async function getBalance(){
  //let Balance = await signer.getBalance(signer._address)
  //document.getElementByID("ethBalance").innerHTML = "Eth Balance: " + Balance
}
