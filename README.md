# Doc_Authenticator_Dapp

## How to setup:
install truffle 
    `npm install -g truffle`

And clone this repository.

In the /client directory, run:
    `npm install @drizzle/store`
    and `npm install Crypto-JS`
## How to run: 
In the main directory, run
```
truffle develop
(develop)$ compile
(develop)$ migrate
```

alternatively, use ganache for the blockchain and only run `truffle migrate` in the main directory

then, run 
    `$npm start `
while in the client directory, which starts the local server