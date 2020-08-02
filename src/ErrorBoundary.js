import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

export class ErrorBoundary extends Component {
  state = {
    hasError: false,
    redirect: false,
  };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Error Boundary Caught An Error", error, info);
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was a problem fetching the list. <Link to="/">Click Here </Link>
          to return to the home page or wait a few seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
