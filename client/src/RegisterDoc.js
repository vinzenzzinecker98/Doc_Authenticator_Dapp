import React from "react";
import {checkMetamask} from "./util.js";
class RegisterDoc extends React.Component {
  state = { stackId: null };

  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      if(checkMetamask(this))
      {
        if(!window.confirm("Do you want to 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 the hashcode \""+ e.target.value + "\" to the ledger?"))
        {
          return;      
        }
      this.regdoc(e.target.value);
      }
      else {
        //TODO: Pop Up
        window.alert("Please install the Metamask Plugin from https://metamask.io/ and login to a valid account to use these features");
        console.log("Error: Metamask Plugin not found or set up incorrectly");
      }
    }
  };

  regdoc = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Documents;
    
    // let drizzle know we want to call the `register` method with `value`
    const stackId = contract.methods["register"].cacheSend(value);
    console.log(stackId);
    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  


  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    //if success return green status:
    if(transactions[txHash]!=undefined && transactions[txHash].status.toString()=='success'){
      return (<div>Transaction status: <span style={{color: '#a7e362'}}>success!</span></div>)
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
        
        Insert SHA-256 Hash value of the Document to register it to the ledger: <br></br>
        <input type="text" onKeyDown={this.handleKeyDown} />
        
        <div>{this.getTxStatus()}</div>
        
      </div>
    );
  }
}

export default RegisterDoc;
