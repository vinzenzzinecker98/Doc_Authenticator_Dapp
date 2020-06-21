import React, { PropTypes, Component } from "react";
import 'react-fine-uploader/gallery/gallery.css';
import CryptoJS from "crypto-js";


class Register_file extends React.Component {
  state = { stackId: null };

  registerDocument = (value) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Documents;

    // let drizzle know we want to call the `register` method with `value`
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

  getfilename = () => {
    const { drizzle, drizzleState } = this.props;
    // Only for testing purposes
    if (this.state.file!=null) var filename = this.state.file.name;
    return `die Datei heißt ${filename && filename.value}`;
  }

  //Methos called by the buttonclick.
  register_provided_file = (event) =>{

    if( document.getElementById('InputFile').files[0]!= null){
    var selectedFile = document.getElementById('InputFile').files[0];
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var data = event.target.result;
      console.log('Data: ' + data);
    }
    };
  reader.readAsBinaryString(file);
  }

  // This Method is called when the user selects a file. It sets the State so that the Method 
  // "register_provided_file" cann access the file.
  setfile= (e) =>{
    const { drizzle, drizzleState } = this.props;
    var file=e.target.files[0];
    this.setState({file});
    //TODO the setstate seems to be not working (?)
  };
    
  //Handles the input of the file and then registers it instantly
  handleFiles = (e) => {
  
    var file = e.target.files[0];

    if(file===undefined){
      return;
    }

    // is needed to reference this.registerDocument from inside the onload function
    // took only 3 hours to find this
    var self=this;



    var reader = new FileReader();

    reader.onload = function (e) {
    var data = e.target.result;
    var encrypted = CryptoJS.SHA256( data );
    console.log('encrypted: ' + encrypted);
    self.registerDocument(encrypted.toString());

    };
    reader.readAsBinaryString(file);
}

  render() {
    return (
      <div>
        To register a document to the ledger:
        <input 
            id="InputFile"
            type="file"
            onChange={this.handleFiles}
        />
        <div>{this.getTxStatus()}</div>
        <div>{this.getfilename()}</div>
      </div>
    );
  }


}
export default Register_file;
