import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import css from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleNameChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      return toast("Please enter something;)");
    }

    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
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
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
