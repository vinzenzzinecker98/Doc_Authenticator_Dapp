import React from "react";
import CryptoJS from "crypto-js";
import { Button } from 'react-bootstrap';
import { toClip, checkMetamask } from "./util.js";
class Validator extends React.Component {
  state = { dataKey1: null };
  _fn = null;

  //Handles the input of the file, creates its hash value and then calls the verification method.
  handleFiles = (e) => {

    var file = e.target.files[0];

    if (file === undefined) {
      return;
    }

    // needed to reference this.verification from inside the onload function
    var self = this;

    this._fn = file.name;
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      var encrypted = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(data)); //fix encoding (see https://stackoverflow.com/questions/20263741/getting-md5sum-of-a-file-through-crypto-js)
      console.log('SHA256: ' + encrypted);
      self.verification(encrypted.toString());
    };
    reader.readAsBinaryString(file);
  }
  //executes the contract call and stores the results in the dataKey1 in the State
  verification = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Documents;

    const dataKey1 = contract.methods["verify"].cacheCall(value);
    this.setState({ dataKey1 });
  };

  //Gets and formats the results, by using the stored dataKey1. Returns a JSX Element containing the information aswell as a button with toClipboard funtionality
  getResult = () => {
    const { Documents } = this.props.drizzleState.contracts;
    // using the saved `dataKey1`, get the return value of GetNumber function
    const result_1 = this.state.dataKey1;
    var address = Documents.verify[this.state.dataKey1];
    //const result_1 = D
    if (address == undefined) {
      return;
    }
    if (address.value == 0x0000000000000000000000000000000000000000 || address == 0) {
      return `The Document has not been registered yet`;
    }

    return (
      <div> This Document <span style={{ color: '#a7e362' }}>has been registered</span> by <b>{address && address.value}</b> <br></br><br></br>
        <Button onCLick={
          toClip(address.value)
        }
          variant="primary">
          <i class="fa fa-clone"></i>
        &nbsp; Copy the public address to your clipboard
      </Button></div>);
  }

  //Gets the Filename of the provided file, used to display it next to the Select Button.
  getFilename = () => {
    if (this._fn == "" || this._fn == null) {
      return null;
    }
    else {

      return ('provided file: ' + this._fn);
    }

  }

  //renders this element, including the file-upload button, a element for the Filename (necessary because we do not use the standard input element (because you cannot style these)) 
  //and an element for displaying the results (which is empty before valid input is given)
  render() {
    return (
      <div>
        Select the document which you want to validate: <br></br><br></br>
        <label className="custom-file-upload">
          <input
            id="InputFile"
            type="file"
            onChange={this.handleFiles}
          />
        Select file</label>

        {' '}
        {this.getFilename()}

        <div>{this.getResult()}</div>

      </div>
    );
  }
}

export default Validator;
