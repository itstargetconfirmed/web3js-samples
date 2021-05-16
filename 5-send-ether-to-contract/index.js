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
    await contract.methods.pay().send({
        from: first_address,
        value: '1000000000000000000' // value in wei.
    });

    // check that the ether value was sent. 
    let result = await contract.methods.checkBalance(first_address).call()
    console.log(`Your result is ${result}.`);

    // we can send ether to the fallback function if the contract can handle it.
    // or we can use this method to send ether to an external owned account.
    await web3.eth.sendTransaction({
        from: first_address,
        to: contract.options.address,
        value: '1000000000000000000' // value in wei.
    })

    result = await contract.methods.checkBalance(first_address).call()
    console.log(`Your result is ${result}.`);
}

// start.
init();