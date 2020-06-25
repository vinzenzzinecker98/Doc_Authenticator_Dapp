import React from "react";

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
    return `The Document is ${myString && myString.value}`;
  }

  render() {  

    return (
      <div>
        

        To check whether a document is valid enter hash:
        <input type="text" onKeyDown={this.handleKeyDown} />
        
        
        <div>{this.getResult()}</div>
       
      </div>
    );
  }
}

export default Validator;
