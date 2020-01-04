import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";
import ErrorBoundry from "../components/ErrorBoundary";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ""
    };
  }

  componentDidMount() {
    let firstUsernames;
    let secondUsernames;
    fetch("https://swapi.co/api/people/")
      .then(response => {
        return response.json();
      })
      .then(users => {
        firstUsernames = users.results.map(result => result.name);
        console.log(firstUsernames);
        this.setState({ robots: firstUsernames });
      });
    fetch("https://swapi.co/api/people/?page=2")
      .then(response => {
        return response.json();
      })
      .then(users => {
        secondUsernames = users.results.map(result => result.name);
        console.log(secondUsernames);
        this.setState({ robots: firstUsernames.concat(secondUsernames) });
      });
  }
  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
