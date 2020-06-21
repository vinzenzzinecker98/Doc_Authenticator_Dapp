import React, { PropTypes, Component } from "react";
import 'react-fine-uploader/gallery/gallery.css';
import CryptoJS from "crypto-js";


class Register_file extends React.Component {
  state = { stackId: null };

  regdoc = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Documents;

    // let drizzle know we want to call the `register` method with `value`
    const stackId = contract.methods["register"].cacheSend(value, {
      from: drizzleState.accounts[3]
    });
    console.log(stackId);
    // save the `stackId` for later reference
    this.setState({ stackId });
  }

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  }

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
  }
  
  loading = (file, callbackProgress, callbackFinal)=> {
    var chunkSize  = 1024*1024; // bytes
    var offset     = 0;
    var size=chunkSize;
    var partial;
    var index = 0;
    if(file.size===0){
        callbackFinal();
    }
    while (offset < file.size) {
        partial = file.slice(offset, offset+size);
        var reader = new FileReader;
        reader.size = chunkSize;
        reader.offset = offset;
        reader.index = index;
        reader.onload = function(evt) {
            this.callbackRead(this, file, evt, callbackProgress, callbackFinal);
        };
        reader.readAsArrayBuffer(partial);
        offset += chunkSize;
        index += 1;
    }
  }
  
  
  handleFiles = (e) => {
  
    var file = e.target.files[0];

    if(file===undefined){
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
    var data = e.target.result;
    var encrypted = CryptoJS.SHA256( data );
    console.log('encrypted: ' + encrypted);

    this.regdoc(encrypted.value);

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
