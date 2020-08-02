import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";
import Navbar from "./Navbar";

const App = () => {
  const themeHook = useState("#EE6352");
  return (
    <ThemeContext.Provider value={themeHook}>
      <div>
        <Navbar />

        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

render(<App />, document.querySelector("#root"));
