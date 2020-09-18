# Doc_Authenticator_Dapp

## How to setup:
install truffle 
    `npm install -g truffle`

Clone this repository.

Make sure you have NodeJS (please use node v10.20.1, on newer versions drizzle has some issues) and npm.

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

alternatively, use ganache for the blockchain. Make sure to run the network on the correct port.

then, run 
    `$npm start `
while in the client directory, which starts the local server.

You also need to add the MetaMask plugin to your Browser (Chrome or Firefox). Then login to Metamask using a private key from the ganache Framework, to ensure you have enough Ether to send transactions.
To connect Metamask to a account go to "import account" and provide with a private key. The private keys can be found in the console after running truffle develop - or when using ganache you find these with a click on the key on the right. 
This is so that you have 100 ETH in your Account, to be able to send transactions (needed for registering documents to the ledger)
