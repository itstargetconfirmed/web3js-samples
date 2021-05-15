const Web3 = require('web3');
const SampleContract = require('../0-sample-smart-contracts/build/contracts/SampleContract.json')

// connect to local blockchain. 
const url = 'http://localhost:7545';

// use http provider, however, there are other providers, 
// see: https://web3js.readthedocs.io/en/v1.3.4/web3.html#providers
const provider = new Web3.providers.HttpProvider(url);

const web3 = new Web3(provider);

const init = async () => {
    // get network id. 
    const network_id = await web3.eth.net.getId();

    // get network. 
    const network = SampleContract['networks'][network_id];
    
    // create web3 contract instance.
    const contract = await new web3.eth.Contract(
        SampleContract.abi,
        network.address
    );


    // we need an address to send the transaction from.
    // it will be used to deduct the gas fee. 
    const addresses = await web3.eth.getAccounts(); 
    const first_address = addresses[0];

    // send transaction to contract. 
    // set num in smart contract to a value of 5.
    // see: https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#contract-send
    await contract.methods.setNum(5).send({
        from: first_address
    });

    // note: look at using the event emitter for confirmations, transactionHash, receipt etc.
    // see: https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#contract-send
    
    // this is instance since we are on our local blockchain instance.
    // read num from the smart contract. 
    const result = await contract.methods.getNum().call();
    console.log(`Your result is ${result}.`);
}

// start.
init();