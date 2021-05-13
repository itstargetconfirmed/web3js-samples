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
    const network_id = await web3.eth.net.getId()

    // get network. 
    const network = SampleContract['networks'][network_id]
    
    // create web3 contract instance.
    const contract = await new web3.eth.Contract(
        SampleContract.abi,
        network.address
    )
}

// start.
init();