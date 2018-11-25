const HDwalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
const Web3 = require('web3');
const { MNEMONIC, API_SECRET } = require('../keys');

const provider = new HDwalletProvider(MNEMONIC, API_SECRET);
const web3 = new Web3(provider);

const abi = JSON.parse(
  fs.readFileSync('../contract/Bank_sol_Bank.abi').toString()
);
const address = fs.readFileSync('../address.txt').toString();

let bank = new web3.eth.Contract(abi, address);

web3.eth.getAccounts().then(function(accounts) {
  // accounts[0] mint 3 * 10**18 coins
  bank.methods
    .mint(web3.utils.toBN(3 * 10 ** 18).toString())
    .send({
      from: accounts[0],
      gas: 3400000
    })
    .on('receipt', console.log)
    .on('error', console.error);
});