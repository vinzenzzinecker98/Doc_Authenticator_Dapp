import React from "react";
import {Card} from 'react-bootstrap';

class description extends React.Component {

  render() {
    return (
      <Card><Card.Header><h1>Description </h1></Card.Header>
      <Card.Body style={{"text-align": "left"}}>

      <p><h3>This Website is an access-point to a local Ethereum blockchain and can be used to authenticate the integrity of documents.</h3></p>
      <p><h4>There are two main features:</h4> (1) You can Register Documents to the ledger<br></br>(2) You can verify Documents (see whether they have been
       registered, and by whom.)
        <p className="text-muted">For the registration feature (1) you need to be signed in to your Ethereum Account, using the Metamask Plug-In 
        (obtainable from <a href="https://metamask.io/">here</a>).<br></br> The verification feature (2) is usable without login and without Metamask.</p>
        <p>
          <h4>For each feature there are two approaches:</h4> <p> You can either use the file upload function which lets you conveniently select the document
             you want to register/validate: 
            <br></br>- File-type and extension of the file is irrelevant, only the filesize may not exceed
          your browsers maximum local cache (which is typically 265 MB).)<br></br>
          - The file is then hashed on your local machine and only the SHA-265 value is registered to the blockchain.</p>
          <p>
            Secondly, if you dont trust the service, you can also generate the SHA-256 value yourself and provide the hash value.
            In case you want to use another hash-function, you can also do that but note that in this case you cannot use the file-select feature for
            validation, and you have to tell the people you provide with the document, which hash function they have to use.
          </p>
          
        </p>
        
        
        
         </p>
    
    
      </Card.Body>
    </Card>
    );
  }


}
export default description;
