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

  fetchStarWarsPeopleByNumberOfPages = () => {
    let userNames = [];
    for (let index = 1; index < 10; index++) {
      let url = `https://swapi.co/api/people/?page=${index}`;
      fetch(url)
        .then(response => {
          return response.json();
        })
        // eslint-disable-next-line no-loop-func
        .then(users => {
          const currentUsernames = users.results.map(result => result.name);
          userNames = userNames.concat(currentUsernames);
          console.log(userNames);
          this.setState({ robots: userNames });
        });
    }
  };

  componentDidMount() {
    this.fetchStarWarsPeopleByNumberOfPages();
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
