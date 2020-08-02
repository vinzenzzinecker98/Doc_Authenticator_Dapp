import React from "react";
import {toClip, checkMetamask} from "./util.js";
import {Button} from 'react-bootstrap';
class Validator extends React.Component {
  state = { dataKey1: null };
  result = { result: "u" };

  //When confirmed with Enter (KeyCode 13), Check whether the string matches the SHA-256 pattern, using a Regular Expression, then call the verification method.
  handleKeyDown = e => {
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

  //Executes the cachecall on the Documents contract and then saves the datakey to the state `datakey1`
  verification = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Documents;    
    const dataKey1 =  contract.methods["verify"].cacheCall(value);
    //console.log(dataKey1);
    this.setState({dataKey1});
  };

  // using the saved `dataKey1`, get the return value of the verify function and display the result. Also provide the "ToClipboard" Button
  getResult = () => {
    const { Documents } = this.props.drizzleState.contracts;
    
    
    var address = Documents.verify[this.state.dataKey1];
    
    if (address == undefined){
      return;
    }
    
    if (address.value == 0x0000000000000000000000000000000000000000 || address == 0){
     return `The Document has not been registered yet`
    }

    return (
    <div> This Document <span style={{color: '#a7e362'}}>has been registered</span> by <b>{address && address.value} </b><br></br><br></br>
    <Button onCLick={toClip(address.value)} variant="primary">
      <i class="fa fa-clone"></i> 
      &nbsp; Copy the public address to Clipboard
    </Button></div>);
  }

  
  //Renders the Validator Element, including the input Field and the Display for the results of the lookup (Which is empty until a valid input was given).
  render() {  

    return (
      <div>
        To check whether a document is valid enter its SHA-256 hash value. (Press enter to confirm input) <br></br><br></br>
        <input type="text" size="64" onKeyDown={this.handleKeyDown} />
        
        
        <div>{this.getResult()}</div>
       
      </div>
    );
  }
}

export default Validator;
