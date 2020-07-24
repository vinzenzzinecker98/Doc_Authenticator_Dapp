# Doc_Authenticator_Dapp

## How to setup:
install truffle 
    `npm install -g truffle`

Clone this repository.

Make sure you have NodeJS (please use node v10.20.1, on newer versions errors may occure) and npm.

In the /client directory, run:
    `npm install`
, which will install all dependencies.

## How to run: 
In the main directory, run
```
truffle develop
(develop)$ compile
(develop)$ migrate
```

alternatively, use ganache for the blockchain.

Then run `truffle migrate` in the main directory

then, run 
    `$npm start `
while in the client directory, which starts the local server.

You also need to add the MetaMask plugin to your Browser (Chrome or Firefox). Then login to Metamask using a private key from the ganache Framework, to ensure you have enough Ether to send transactions.
