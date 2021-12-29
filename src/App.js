import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Spiner from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastContainer, toast } from "react-toastify";
import * as api from "./services/api";

import "./App.css";


export default class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
    error: null,
    largeImageURL: "",
    showModal: false,
    loader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevPage !== nextPage) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }
  onSearchQuery = (query) => {
    this.setState({
      images: [],
      query: query,
      page: 1,
    });
  };

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ loader: true });

    api
      .fetchImages(query, page)
      .then(({ hits }) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }))
      )

      .catch((error) => {
        toast("Trouble. Something is wrong :(");
        this.setState({ error });
      })

      .finally(() => this.setState({ loader: false }));
  };
  handleFormSubmit = (images) => {
    this.setState({ images });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: "",
    }));
  };

  handleClickImage = (largeImageURL) => {
    this.setState({
      largeImageURL: largeImageURL,
      showModal: true,
    });
  };

  render() {
    const { images, showModal, largeImageURL, loader } = this.state;

    return (
      <div>
        {loader && <Spiner />}
        <Searchbar onSubmit={this.onSearchQuery} />
        <ImageGallery images={images} onClickImage={this.handleClickImage} />
        {images.length < 1 && (
          <p className="notification">
            {" "}
            Please enter what you want to see ¯\_(ツ)_/¯{" "}
          </p>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" width={650} />
          </Modal>
        )}
        {images.length >= 12 ? <Button onSearch={this.fetchImages} /> : null}
        <ToastContainer />
      </div>
    );
  }
}