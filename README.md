# Doc_Authenticator_Dapp

## How to setup:
install truffle 
    `npm install -g truffle`

Clone this repository.

Make sure you have NodeJS (please use node v10.20.1, on newer versions drizzle has some issues) and npm.

In the /client directory, run:
    `npm install`
, which will install all dependencies.

## How to run using ganache blockchain:
install ganache & start a network on localhost. Specify port as 7545 (default value) and network id as 5777. From there import the contracts by selecting the truffle-config.js
Also run `truffle migrate` to migrate the contracts

## How to run using only truffle: 
In the main directory, run
```
truffle develop
(develop)$ compile
(develop)$ migrate
```
when using truffle develop, you cannot change the port (it ignores the specified port in truffle-config :( ), so you have to change the port in client/index.js to match your port. This is only an issue when metamask in not connected, as metamask acts as intermediate.

## setup frontend
run 
    `npm start `
while in the /client directory, which starts the local server. You browser should open up automatically.

For using all features you also need to add the MetaMask plugin to your browser (Chrome or Firefox). 
To connect Metamask to a account with sufficient balance go to "import account" and provide with a private key. The private keys can be found in the console after running truffle develop - or when using ganache you find these with a click on the key on the right. (which account you choose is not important, as both chains generate 10 Accounts for testing purposes)
This is so that you have 100 ETH in your Account, to be able to send transactions (needed for registering documents to the ledger)