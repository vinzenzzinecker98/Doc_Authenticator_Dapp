import React, { PropTypes, Component } from "react";
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
    if (this.state.file!=null) var filename = this.state.file.name;
    return `die Datei heißt ${filename && filename.value}`;
  }
  register_provided_file = (e) =>{
   
    //  this.state.file.name
    

     //placeholder for hashing

    // TODO generate hash of the File and store it (call regdoc(hash))
  }

  setfile= (e) =>{
    var file=e.target.files[0];
    this.setState({file});
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
        <input
            type="button"
            
            value="clickME"
          
            onClick={this.register_provided_file()}

        />
        <div>{this.getTxStatus}</div>
        <div>{this.getfilename()}</div>
      </div>
    );
  }
}

export default Register_file;
