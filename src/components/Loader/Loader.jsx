import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import css from './Loader.module.css';

export default class Spiner extends Component {
  render() {
    return (
      <div className={css.spiner}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} 
        />
      </div>
    );
  }
}
