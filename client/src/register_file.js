import React from "react";
import CryptoJS from "crypto-js";
import {checkMetamask} from "./util.js";

class Register_file extends React.Component {
  state = { stackId: null };
  _fn=null;

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

  

  getFilename=()=>{
    if(this._fn==""||this._fn==null){
      return null;
    }
    else{
    
      return ('provided file: ' + this._fn);
    }

  }
  
  //Handles the input of the file and then registers it after checking for MetaMask and user confirmation. 
  handleFiles = (e) => {
    if (!checkMetamask(this)){
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

    this._fn=file.name;
    var reader = new FileReader();
    reader.onload = 
      function (e) {
        self._fn=file.name;
        var data = e.target.result;
        var encrypted = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(data)); //fix encoding (see https://stackoverflow.com/questions/20263741/getting-md5sum-of-a-file-through-crypto-js)
        console.log('SHA265 of the document: ' + encrypted);
        self.registerDocument(encrypted.toString());
    };
    reader.readAsBinaryString(file);
}}

  render() {
    return (
      <div>
        Upload the document to register it to the ledger: <br></br><br></br>
        <label className="custom-file-upload">
        <input 
            id="InputFile"
            type="file"
            onChange={this.handleFiles}
        />
        Select file
        </label>
        {' '}
        {this.getFilename()}

        
        <div>{this.getTxStatus()}</div>
        
      </div>
    );
  }


}
export default Register_file;
