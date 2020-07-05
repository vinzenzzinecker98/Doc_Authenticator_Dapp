import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterDoc from "./RegisterDoc";
import Validator from "./Validator";
import Register_file from './Register_file';
import Validator_file from './Validator_file'
import Nav from 'react-bootstrap/Nav'
import {Navbar, Accordion, Card, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends React.Component {
  

  state = { loading: true, drizzleState: null };
  render() {
    if (this.state.loading) return "Still loading Drizzle...";
	
    return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

  <Router>
    <Navbar>
      <Navbar.Brand>Doc Authentication</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav fill variant="tabs" defaultActiveKey="/home"> 
            <Nav.Item>
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/reg">Register Documents to the ledger</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/val">Validate Documents</Nav.Link>
            </Nav.Item>      
          </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className="wrapper">
    <Switch> 

          <Route path="/reg">
          <Accordion>
              <Card>
              <h1>Register Documents</h1>
              </Card>
              
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="primary" eventKey="1">
                    Register by file upload feature
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
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
                  <Accordion.Toggle as={Button} variant="primary" eventKey="0">
                    Register by manual Hash input
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
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
                  <Accordion.Toggle as={Button} variant="primary" eventKey="1">
                    Validate by file upload feature
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
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
                  <Accordion.Toggle as={Button} variant="primary" eventKey="0">
                    Validate by manual Hash input
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
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

          <Route path="/home">
            <h1>Description goes here</h1>
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

