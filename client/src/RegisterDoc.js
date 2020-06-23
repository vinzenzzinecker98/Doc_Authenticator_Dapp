import React from "react";

class RegisterDoc extends React.Component {
  state = { stackId: null };

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

  render() {
    return (
      <div>
        <h1> Register documents:</h1>
        To register a document to the ledger:
        <input type="text" onKeyDown={this.handleKeyDown} />
        Please insert the generated hash
        <div>{this.getTxStatus()}</div>
        
      </div>
    );
  }
}

export default RegisterDoc;
