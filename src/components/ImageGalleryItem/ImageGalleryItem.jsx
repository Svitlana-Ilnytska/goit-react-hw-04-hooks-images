import React from "react";
import PropTypes from "prop-types";

import css from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({
  webformatURL,
  tags,
  onClickImage,
  largeImageURL,
}) => {
  const largeImage = () => onClickImage(largeImageURL);
  return (
    <img
      src={webformatURL}
      alt={tags}
      onClick={largeImage}
      className={css.image}
    />
  );
};
ImageGalleryItem.defaultProps = {
  tags: "",
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  onClickImage: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
