import React, { Component } from "react";
import { Link } from "@reach/router";
import ThemeContext from "./ThemeContext";
export class Navbar extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {([theme]) => (
          <header className="NavBar" style={{ backgroundColor: theme }}>
            <Link to="/">
              <h1 className="Title">Adopt Me!</h1>
            </Link>
            <Link to="/">
              <li className="NavBarItem">Home</li>
            </Link>
          </header>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Navbar;
