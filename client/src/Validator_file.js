import React from "react";
import CryptoJS from "crypto-js";
class Validator extends React.Component {
  state = { dataKey1: null };
  result = { result: "u" };
  

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
    self.verification(encrypted.toString());

    };
    reader.readAsBinaryString(file);
}
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
    const myString = Documents.verify[this.state.dataKey1];
    //const result_1 = D
    return `The Document is ${myString && myString.value}`;
  }

  render() {  

    return (
      <div>
        To check whether a document is valid enter hash:
        
        <input 
            id="InputFile"
            type="file"
            onChange={this.handleFiles}
        />
        
        <div>{this.getResult()}</div>
       
      </div>
    );
  }
}

export default Validator;
