const Web3 = require('web3');
const SampleContract = require('../0-sample-smart-contracts/build/contracts/SampleContract.json')

// connect to local blockchain. 
const url = 'http://localhost:7545';

// use http provider, however, there are other providers, 
// see: https://web3js.readthedocs.io/en/v1.3.4/web3.html#providers
const provider = new Web3.providers.HttpProvider(url);

const web3 = new Web3(provider);

const init = async () => {

    // convert to wei.
    const eth_value = 10;
    const wei_value = web3.utils.toWei(eth_value.toString(), 'ether');

    console.log(`Your eth value of ${eth_value} to wei value is ${wei_value}.`);

    // convert from wei.
    const eth_value_2 = web3.utils.fromWei(wei_value.toString(), 'ether');
    console.log(`Your wei value of ${wei_value} to ether value is ${eth_value_2}`);

    // the above functions can also use big numbers (BN).
    const bn = web3.utils.toBN('1000');
    console.log(`A big number example is printed below.`);
    console.log(bn);

    // converting to/from hex/ascii.
    const string = 'test string value';
    const hex = web3.utils.asciiToHex(string);
    console.log(`The string ${string} has a hex value of ${hex}.`);

    const string_2 = web3.utils.hexToAscii(hex);
    console.log(`The hex value ${hex} has a string value of ${string_2}`);

    // other important functions. 
    // web3.utils.toHex()
    // web3.utils.isHex()
    // web3.utils.randomHex()
    // web3.utils.padLeft()

    // see: https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html
}

// start.
init();