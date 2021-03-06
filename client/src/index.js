import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



// import drizzle functions and contract artifact
import { Drizzle } from "@drizzle/store";
import Documents from "./contracts/Documents.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [Documents],
  web3: {
    fallback: {
      type: "ws",
      //127.0.0.1:7545 is the location where the default ganache chain is running, when using truffle develop, change to 9545
      url: "ws://127.0.0.1:7545",
    },
  },
};

// setup drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(
  <React.StrictMode>
    <App drizzle={drizzle}/>
  </React.StrictMode>,
  document.getElementById('root')
);