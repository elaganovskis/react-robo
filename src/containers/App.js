import React, { Component } from "react";
import SearchBox from "../components/SearchBox";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      // updating state and using users from fetching url
      // if users => would be empty array, we would get page - loading
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = event => {
    // update state after change in the searchbox field
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    // filter robots through name and return those that match the searchfield
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !robots.length ? (
      //if state is not updated with json users we get 0 users
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f2">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        {/* passing into cardlist only filtered robots, not just robots. Otherwise the change will not happen */}
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;
