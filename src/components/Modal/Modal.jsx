import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal ({onClose}) {
  // componentDidMount() {
  //   window.addEventListener("keydown", this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("keydown", this.handleKeyDown);
  // }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  
    // returned function will be called on component unmount 
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [])


  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  // render() {
    return createPortal(
      <div className={css.overlay} onClick={handleBackdropClick}>
        <div className={css.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
// }
