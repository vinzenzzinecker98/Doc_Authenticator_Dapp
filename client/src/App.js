import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterDoc from "./RegisterDoc";
import Validator from "./Validator";
import Register_file from './Register_file';

export default class App extends React.Component {
  state = { loading: true, drizzleState: null };
  render() {
    if (this.state.loading) return "Still loading Drizzle...";
	
    return (
    <div className="App">
    <h1> Register documents:</h1>
	
        <RegisterDoc
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <Register_file
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      <h1>Validate Documents:</h1>
      	<Validator
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
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

