import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterDoc from "./RegisterDoc";
import Validator from "./Validator";
import Register_file from './register_file';
import Validator_file from './Validator_file'
import Nav from 'react-bootstrap/Nav'
import metamasklogo from "./ressources/metamask.png"
import {Navbar, Accordion, Card, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Description from "./description"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {checkMetamask} from "./util.js";
export default class App extends React.Component {
  
  
  state = { loading: true, drizzleState: null, showModal: false, modalText: null };


  //This function checks whether MetaMask is running and returns a corresponding element to appear in the Navbar (Top Right)
  mmstatus=()=>{
    if (checkMetamask(this)){
      return (<div><img src={metamasklogo} alt="fox logo" width="30" height="30"></img>MetaMask is running</div>)
    }
    else{
      return ( <div>Please install metamask plugin from <a href="https://metamask.io/">here</a></div>)
    }
  }

  // This Method renders the Application
  render() {
    if (this.state.loading) return "Loading Drizzle...";
	
    return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

  <Router>
    <Navbar fixed="top" expand="lg" bg="light">
      <Navbar.Brand>Doc Authentication</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav fill variant="tabs" defaultActiveKey="/"> 
            <Nav.Item>
              <Nav.Link href="/" as={Link} to="/">Service description</Nav.Link>
            </Nav.Item>            
            <Nav.Item>
              <Nav.Link href="/reg" as={Link} to="/reg">Register documents</Nav.Link>
            </Nav.Item>
                <Nav.Item>
              <Nav.Link href="/val" as={Link} to="/val">Validate documents</Nav.Link>
            </Nav.Item>      
          </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      {this.mmstatus()}
    </Navbar.Text>
  </Navbar.Collapse>
    </Navbar>
    <div className="wrapper">
    <Switch> 
          <Route path="/reg">
          <Accordion defaultActiveKey="0">
              <Card>
              <h1>Register Documents</h1>
              </Card>
              
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="outline-secondary" block eventKey="0">
                    Register by file upload feature
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  <Register_file
                    drizzle={this.props.drizzle}
                    drizzleState={this.state.drizzleState}
                  />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="outline-secondary" block eventKey="1">
                    Register by manual Hash input
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <RegisterDoc
                      drizzle={this.props.drizzle}
                      drizzleState={this.state.drizzleState}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            
            
          </Route>

          <Route path="/val">
          <Accordion defaultActiveKey="0">
              <Card>
              <h1>Validate Documents</h1>
              </Card>
              
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="outline-secondary" block eventKey="0">
                    Validate by file upload feature
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  <Validator_file
                    drizzle={this.props.drizzle}
                    drizzleState={this.state.drizzleState}
                  />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="outline-secondary" block eventKey="1">
                    Validate by manual Hash input
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <Validator
                      drizzle={this.props.drizzle}
                      drizzleState={this.state.drizzleState}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          
          
          </Route>

          <Route path="/">
          <Description></Description>
          </Route>

    </Switch>
    </div>
  </Router>
    
      
        
        
      
      	
      </div>

    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }
}

