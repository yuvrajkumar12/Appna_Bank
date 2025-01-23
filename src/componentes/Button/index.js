import React from "react";
import "./style.css";

function Button({ text, onClick, blue }) {
  return (
    <button
      className={blue ? "btn btn-blue" : "btn"}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
