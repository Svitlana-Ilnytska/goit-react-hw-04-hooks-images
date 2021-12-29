import React from "react";
import PropTypes from "prop-types";

import css from "./Button.module.css";

const Button = ({ onSearch }) => (
  <button type="button" onClick={onSearch} className={css.button}>
    Load more
  </button>
);

Button.defaultProps = {
  onLoadMore: () => {},
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
