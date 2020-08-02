import React, { Component } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate, Redirect } from "@reach/router";
import Modal from "./modal";

class Details extends Component {
  state = {
    loading: true,
    showModal: false,
  };

  componentDidMount() {
    pet
      .animal(+this.props.id)
      .then(({ animal }) => {
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      .catch((err) => this.setState({ error: err }));
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return (
        <ThemeContext.Consumer>
          {([theme]) => (
            <div class="loadingio-spinner-eclipse-wt7ne2nbazj">
              <div class="ldio-c4gnd68xam">
                <div
                  style={{ boxShadow: `0 4.1160000000000005px 0 0 ${theme}` }}
                ></div>
              </div>
            </div>
          )}
        </ThemeContext.Consumer>
      );
    }

    const {
      animal,
      breed,
      location,
      description,
      media,
      name,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <ThemeContext.Consumer>
          {([theme]) => (
            <div className="detailsInfo">
              <h1 style={{ color: theme }}>{name}</h1>
              <h2>{`${animal} • ${breed} • ${location}`}</h2>
              <button
                className="detailsButton"
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
              <p>{description}</p>
              {showModal ? (
                <Modal>
                  <div>
                    <h1>Would you like to adopt {name}?</h1>
                    <div className="buttons">
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.adopt}
                      >
                        Yes
                      </button>
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.toggleModal}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Modal>
              ) : null}
            </div>
          )}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

export default function DetailsWithErrorBoudary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
