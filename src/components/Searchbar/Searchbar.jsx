import React, { Component } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import css from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    query: "",
  };

  handleNameChange = (e) => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.query.trim() === "") {
      return toast("Please enter something;)");
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={query}
            name="query"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
