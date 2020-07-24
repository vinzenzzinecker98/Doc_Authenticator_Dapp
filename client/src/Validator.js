import React from "react";
import {toClip, checkMetamask} from "./util.js";
import {Button} from 'react-bootstrap';
class Validator extends React.Component {
  state = { dataKey1: null };
  result = { result: "u" };
  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      var regex = new RegExp("[A-Fa-f0-9]{64}");
        if(regex.test(e.target.value))
        {
          this.verification(e.target.value);
        }
        else {
          window.confirm("Your given String is not a SHA-256 value, please try again. Please provide the String representation of a SHA256 Hash, which consists of 64 Hex values. Example: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e")
        }
      
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
    <Button onCLick={
      toClip(address.value)
      } variant="primary">
      <i class="fa fa-clone"></i> 
      &nbsp; Copy the public address to Clipboard
    </Button></div>);
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
