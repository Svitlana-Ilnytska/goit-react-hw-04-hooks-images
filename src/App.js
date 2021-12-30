import React, { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Spiner from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastContainer, toast } from "react-toastify";
import * as api from "./services/api";

import "./App.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  });

  const onSearchQuery = (query) => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const fetchImages = () => {
    setLoader(true);

    api
      .fetchImages(query, page)
      .then(
        ({ hits }) => setImages((prevImage) => [...prevImage, ...hits]),
        setPage((prevPage) => prevPage + 1)
      )

      .catch((error) => {
        toast("Trouble. Something is wrong :(");
        setError(error);
      })

      .finally(() => setLoader(false));
  };

  // const handleFormSubmit = (images) => {
  //   setImages(images);
  // };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
    setLargeImageURL("");
  };

  const handleClickImage = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  return (
    <div>
      {error && (
        <p className="notification">Sorry. Something is wrong ¯\_(ツ)_/¯</p>
      )}
      {loader && <Spiner />}
      <Searchbar onSubmit={onSearchQuery} />
      <ImageGallery images={images} onClickImage={handleClickImage} />
      {images.length < 1 && (
        <p className="notification">
          Please enter what you want to see ¯\_(ツ)_/¯
        </p>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" width={650} />
        </Modal>
      )}
      {images.length >= 12 ? <Button onSearch={fetchImages} /> : null}
      <ToastContainer />
    </div>
  );
}
