import React, { PropTypes, Component } from "react";
import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'

const uploader = new FineUploaderTraditional({
  options: {
      chunking: {
          enabled: true
      },
      deleteFile: {
          enabled: true,
          endpoint: '/uploads'
      },
      request: {
          endpoint: '/uploads'
      },
      retry: {
          enableAuto: true
      }
  }
})
class Register_file extends React.Component {
  state = { stackId: null, file: null };
  
  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      this.regdoc(e.target.value);
    }
  };

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
  register_provided_file = (e) =>{
   
    //  this.state.file.name
    

     //placeholder for hashing

    // TODO generate hash of the File and store it (call regdoc(HASH_VALUE))
  }

  // This Method is called when the user selects a file. It sets the State so that the Method 
  // "register_provided_file" cann access the file.
  setfile= (e) =>{
    const { drizzle, drizzleState } = this.props;
    var file=e.target.files[0];
    this.setState({file});
    //TODO the setstate seems to be not working (?)
  }

  render() {
    return (
      <div>
        To register a document to the ledger:
        <input 
            id="InputFile"
            type="file"
            OnChange={this.setfile}
        />
        <Gallery uploader={ uploader } />
        <input
            type="button"
            
            value="Register chosen file"
          
            onClick={this.register_provided_file()}

        />
        <div>{this.getTxStatus}</div>
        <div>{this.getfilename()}</div>
      </div>
    );
  }
}

export default Register_file;
