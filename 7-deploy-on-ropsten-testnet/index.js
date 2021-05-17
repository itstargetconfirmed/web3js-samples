require('dotenv').config()
const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const SampleContract = require('../0-sample-smart-contracts/build/contracts/SampleContract.json')


// use hd wallet provider, however, as we need to sign transactions for the public testnet. 
// ropsten testnet faucet: https://ipfs.io/ipfs/QmVAwVKys271P5EQyEfVSxm7BJDKWt42A2gHvNmxLjZMps/

const provider = new HDWalletProvider({
    privateKeys: [process.env.WALLET_PRIVATE_KEY],
    providerOrUrl: process.env.ROPSTEN_INFURA_URL
  });

const web3 = new Web3(provider);

const init = async () => {

    // deploy contract on testnet.
    let contract = await new web3.eth.Contract(
        SampleContract.abi
    );

    contract = await contract.deploy({
        data: SampleContract.bytecode
    }).send({
        from: process.env.WALLET_PUBLIC_KEY
    });

    // send transaction using setNum.
    const tx = await contract.methods.setNum(10).send({
        from: process.env.WALLET_PUBLIC_KEY
    });

    console.log(`Your transaction receipt is printed below.`);
    console.log(tx);
}

// start.
init();