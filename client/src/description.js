import React from "react";
import {Card} from 'react-bootstrap';

class description extends React.Component {

  render() {
    return (
      <Card><Card.Header><h1>Description </h1></Card.Header>
      <Card.Body style={{"text-align": "left"}}>

      <p><h2>This Website is an access-point to a local blockchain and can be used to authenticate the integrity of documents.</h2></p>
      <p><h3>There are two main features:</h3> (1) You can Register Documents to the ledger<br></br>(2) You can verify Documents (see whether they have been registered, and by whom.)
        <p className="text-muted">For the registration feature (1) you need to be signed in to your Ethereum Account, using the Metamask Plug-In 
        (obtainable from <a href="https://metamask.io/">here</a>).<br></br> The verification feature (2) is usable without login and without Metamask.</p>
        <p>
          <h3>For each feature there are two approaches:</h3> <p> You can either use the file upload function which lets you conveniently select the document you want to register/validate: 
            <br></br>- File-type and extension of the file is irrelevant, only the filesize may not exceed
          your browsers maximum local cache (which is typically 265 MB).)<br></br>
          - The file is then hashed on your local machine and only the SHA-265 value is registered to the blockchain.</p>
          <p>
            Secondly, if you dont trust the service, you can also generate the SHA-256 value yourself and provide the hash value.
          </p>
          
        </p>
        
        
        
         </p>
    
    
      </Card.Body>
    </Card>
    );
  }


}
export default description;
