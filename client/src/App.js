import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReadString from "./ReadString";
import SetString from "./SetString";
import Component from 'react';

export default class App extends React.Component {
  state = { loading: true, drizzleState: null };
  render() {
    if (this.state.loading) return "Loading Drizzle...";
	
    return (
      <div className="App">
    <h1> local demo system </h1>
	
        <ReadString
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      	<SetString
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

