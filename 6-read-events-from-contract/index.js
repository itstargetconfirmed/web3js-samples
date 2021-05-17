const Web3 = require('web3');
const SampleContract = require('../0-sample-smart-contracts/build/contracts/SampleContract.json')

// connect to local blockchain. 
const url = 'ws://localhost:7545';

// use http provider, however, there are other providers, 
// see: https://web3js.readthedocs.io/en/v1.3.4/web3.html#providers
const provider = new Web3.providers.WebsocketProvider(url);

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

    // get eth accounts. 
    const addresses = await web3.eth.getAccounts() ;
    const first_address = addresses[0];

    // send transaction to trigger event. 
    const tx = await contract.methods.setNum(5).send({
        'from': first_address
    });

    console.log(`Your transaction receipt is printed below.`);
    console.log(tx);

    console.log(`Your event data is printed below.`);
    console.log(tx.events.NumSet.raw);


    // we can also get past events. 
    const events = await contract.getPastEvents('NumSet', {
        fromBlock: 0,
        filter: {
            'num': 10
        }
    });

    console.log(`Your past NumSet events from block 0 filtered by a value of num = 10 are printed below.`);
    events.forEach(event => {
        console.log(event.raw);
    });


    // we can also subscribe to events.
    // must use websocket provider.
    contract.events.NumSet({

    })
    .on('data', event => {
        console.log(`You just received a NumSet event.`);
        console.log(event.raw);
    });

    // send transaction to show that the event subscription is working.
    await contract.methods.setNum(5).send({
        'from': first_address
    });

}

// start.
init();