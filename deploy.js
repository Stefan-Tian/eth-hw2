const HDwalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
const Web3 = require('web3');
const { MNEMONIC, API_SECRET } = require('./keys');

const provider = new HDwalletProvider(MNEMONIC, API_SECRET);
const web3 = new Web3(provider);

const abi = JSON.parse(
  fs.readFileSync('./contract/Bank_sol_Bank.abi').toString()
);
const bytecode =
  '0x' + fs.readFileSync('./contract/Bank_sol_Bank.bin').toString();

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ gas: '2000000', from: accounts[0] });

  const contractAddress = result.options.address;

  fs.writeFileSync('./address.txt', contractAddress);
};

deploy();
