import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterDoc from "./RegisterDoc";
import Validator from "./Validator";
import Register_file from './Register_file';
import Validator_file from './Validator_file'
import Nav from 'react-bootstrap/Nav'
import {Container, Row, Col, Navbar} from 'react-bootstrap';
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
  <Router>
    <Navbar  bg="light" expand="lg">
      <Navbar.Brand>Doc Authentication</Navbar.Brand>


    <Nav className="mr-auto" justify variant="pill" defaultActiveKey="/"> 
      <Nav.Item>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/reg">Register Documents to the ledger</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/val">Validate Documents</Nav.Link>
      </Nav.Item>      
    </Nav>

    </Navbar>
    <Switch>
          

          <Route path="/reg">
            <Container fluid>
              <Row justify="center">
                <h1 justify="center">
                  Register File
                </h1>
              </Row>
              <Row>
                <Col xs={2}> insert SHA-256 hash of the document manually</Col>
                <Col>      
                  <RegisterDoc
                      drizzle={this.props.drizzle}
                      drizzleState={this.state.drizzleState}
                  />
                </Col>
              </Row>
              <Row>
              <Col xs={2}> File-Upload-Feature</Col>
                <Col>      
                  <Register_file
                      drizzle={this.props.drizzle}
                      drizzleState={this.state.drizzleState}
                  />
                </Col>
                      
              </Row>
            </Container>
            
            
          </Route>

          <Route path="/val">
          <Validator
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
          <Validator_file
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
          />
          </Route>

          <Route path="/">
            <h1>Description goes here</h1>
          </Route>

    </Switch>
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

