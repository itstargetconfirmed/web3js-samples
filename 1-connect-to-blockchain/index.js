const Web3 = require('web3');

// connect to local blockchain. 
const url = 'http://localhost:7545';

// use http provider, however, there are other providers, 
// see: https://web3js.readthedocs.io/en/v1.3.4/web3.html#providers
const provider = new Web3.providers.HttpProvider(url);

const web3 = new Web3(provider);

// test connection by getting block number. 
web3.eth.getBlockNumber().then(block => {
    console.log(block);
})