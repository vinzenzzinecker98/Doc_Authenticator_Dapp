import React from "react";
import {checkMetamask} from "./util.js";
import {Button} from 'react-bootstrap';
class RegisterDoc extends React.Component {
  state = { stackId: null };
  hashvalue=null;

  checkavailibility = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Documents;    
    const key =  contract.methods["verify"].cacheCall(value);
    const { Documents } = drizzleState.contracts;
    //console.log(dataKey1);
    
    var address = Documents.verify[key];
    if (address == undefined){
      return true;
    }
    if (address.value == 0x0000000000000000000000000000000000000000 || address == 0){
     return true;
    }
    return false;
  };

  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      if(checkMetamask(this))
      {
        if(!window.confirm("Do you want to 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 the hashcode \""+ e.target.value + "\" to the ledger?"))
        {
          return;      
        }
        var regex = new RegExp("[A-Fa-f0-9]{64}");
        if(regex.test(e.target.value))
        {
          this.regdoc(e.target.value);
        }
        else {
          window.confirm("Your given String is not a SHA-256 value, please try again. Please provide the String representation of a SHA256 Hash, which consists of 64 Hex values. Example: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e")
        }
      }
      else {
        //TODO: Pop Up
        window.alert("Please install the Metamask Plugin from https://metamask.io/ and login to a valid account to use these features");
        console.log("Error: Metamask Plugin not found or set up incorrectly");
      }
    }
  };

  checkavailibility = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Documents;    
    const key = contract.methods["verify"].cacheCall(value);
    const { Documents } = drizzleState.contracts;
    //console.log(dataKey1);

    this.setState({key});

    
    return this.resultAvailibitly(); 
    
  };
  resultAvailibitly = () => {
    const { Documents } = this.props.drizzleState.contracts;   
    
    var address = Documents.verify[this.state.key];

    if(address!==undefined)
    { 
       if (address.value == 0x0000000000000000000000000000000000000000 || address == 0 || address.value.toString() == "0x0000000000000000000000000000000000000000" )
       {
        return true;
       }
       else{         
       return false;
       }
    }
    else{
      setTimeout(this.resultAvailibitly, 250);
    
  }
  }
  
  regdoc = (value) => {
    //do in async function, to wait for the cache call which returns the availability of the document(checks whether it has been regstered)
    (async() => {
      while(this.checkavailibility(value)==undefined){
        await new Promise(resolve => setTimeout(resolve, 250));
      }
      if(this.checkavailibility(value)==false)
      {
      window.alert("This document has already been registered. You cannot alter ownership");
      return;
      }
    
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Documents;

    // let drizzle know we want to call the `register` method with `value`
    // TODO: Sending the correct account??? Only gives 0x00...001
    
    const stackId = contract.methods["register"].cacheSend(value);
    this.hashvalue=  value;
    console.log(stackId);
    // save the `stackId` for later reference
    this.setState({ stackId });
    })();


    
  };

  


  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    //if success return green status and generate Email Link - see https://tools.ietf.org/html/rfc6068
    if(transactions[txHash]!=undefined && transactions[txHash].status.toString()=='success'){
      this.message=
      "mailto:?subject=How to verify the Document&body=The SHA-265 value of the document is: "+
      this.hashvalue+ " %0D%0AYou can verify it at localhost:3000/val.%0D%0AMy public address is: "+ transactions[txHash].receipt.from+ 
      ". %0D%0AYou can also look it up on the Blockchain: The registration transaction (TX-hash: "+ transactions[txHash].receipt.transactionHash +
      ") is stored in Block "+ transactions[txHash].receipt.blockNumber+ ".";

      return (<div>Transaction status: <span style={{color: '#a7e362'}}>success!</span><br></br><br></br>   

      <Button href={this.message} variant="primary">Generate Email</Button>
      </div>)
    }
    //if error return red status
    if(transactions[txHash]!=undefined && transactions[txHash].status.toString()=='error'){
      return (<div>Transaction status: <span style={{color: '#f2a6a2'}}>error</span></div>)
    }
    //if pending return yellow status:
    if(transactions[txHash]!=undefined && transactions[txHash].status.toString()=='pending'){
      return (<div>Transaction status: <span style={{color: '#ebcf1a'}}>pending</span></div>)
    }
    // otherwise, return the transaction status
    else{
      return (<div>Transaction status: <span style={{color: '#ebcf1a'}}>undefined</span></div>)      
    }

  };

  render() {
    return (
      <div>
        
        Insert the SHA-256 hash value of the document to register it to the ledger. (Press enter to confirm input) <br></br><br></br>
        <input type="text" size="64" onKeyDown={this.handleKeyDown} />
        
        <div>{this.getTxStatus()}</div>
        
      </div>
    );
  }
}

export default RegisterDoc;
