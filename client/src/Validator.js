import React from "react";
import {toClip, checkMetamask} from "./util.js";
class Validator extends React.Component {
  state = { dataKey1: null };
  result = { result: "u" };
  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      this.verification(e.target.value);
    }
  };

  
  verification = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Documents;

    
    const dataKey1 =  contract.methods["verify"].cacheCall(value);

    console.log(dataKey1);

    this.setState({dataKey1});
  };


  getResult = () => {
    const { Documents } = this.props.drizzleState.contracts;
    // using the saved `dataKey1`, get the return value of GetNumber function
    const result_1 = this.state.dataKey1;
    var address = Documents.verify[this.state.dataKey1];
    //why is it alyws 0 or 1???
    if (address == undefined){
      return `Enter the SHA-256 hash of the document`
    }
    if (address.value == 0x0000000000000000000000000000000000000000 || address == 0){
     return `The Document has not been registered yet`
    }

    return (
    <div> This Document <span style={{color: '#a7e362'}}>has been registered</span> by <b>{address && address.value}</b><br></br> <br></br>
    <button class="botn" onCLick={
      toClip(address.value)
      }>
      <i class="fa fa-clone"></i> 
      &nbsp; Copy the public address to Clipboard
    </button></div>);
  }
  
  render() {  

    return (
      <div>
        

        To check whether a document is valid enter its SHA-256 hash value: <br></br><br></br>
        <input type="text" onKeyDown={this.handleKeyDown} />
        
        
        <div>{this.getResult()}</div>
       
      </div>
    );
  }
}

export default Validator;
