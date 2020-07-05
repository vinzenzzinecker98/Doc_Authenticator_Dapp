import React from "react";
import CryptoJS from "crypto-js";


class Register_file extends React.Component {
  state = { stackId: null };

  registerDocument = (value) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Documents;

    // let drizzle know we want to call the `register` method with `value`
    // TODO: Sending the correct account??? Only gives 0x00...001
    const stackId = contract.methods["register"].cacheSend(value, {
      from: drizzleState.accounts[3]
    });
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

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  

  checkMetamask = () =>  {
    var web3=this.props.drizzle.web3;
    if (typeof web3 !== 'undefined') {
      console.log('web3 is enabled');
      if (web3.currentProvider.isMetaMask === true) {
        
        console.log('MetaMask is active');
        return true;
      } else {
        console.log('MetaMask is not available');
        return false;
      }
    } else {
      console.log('web3 is not found');
      return false;
    };
  }
  
  //Handles the input of the file and then registers it after checking for MetaMask and user confirmation. 
  handleFiles = (e) => {
    if (!this.checkMetamask()){
      window.alert("Please install the Metamask Plugin from https://metamask.io/ and login to a valid account to use these features");
      console.log("Error: Metamask Plugin not found or set up incorrectly");
    }
    else {
    var file = e.target.files[0];

    if(file===undefined){
      return;
    }
    if(!window.confirm("Do you want to 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 the file \"" + file.name + "\" to the ledger?"))
    {
      return;      
    }
    // is needed to reference this.registerDocument from inside the onload function (no idea why)
    var self=this;
    var reader = new FileReader();
    reader.onload = 
      function (e) {
        var data = e.target.result;
        var encrypted = CryptoJS.SHA256( data );
        console.log('SHA265 of the document: ' + encrypted);
        self.registerDocument(encrypted.toString());
    };
    reader.readAsBinaryString(file);
}}

  render() {
    return (
      <div>
        Upload the Document to register it to the ledger: <br></br>
        <input 
            id="InputFile"
            type="file"
            onChange={this.handleFiles}
        />
        <div>{this.getTxStatus()}</div>
        
      </div>
    );
  }


}
export default Register_file;
