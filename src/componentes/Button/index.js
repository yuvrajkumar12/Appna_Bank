import React from "react";
import "./style.css";

function Button({ text, onClick, blue,disable }) {
  return (
    <div
      className={blue ? "btn btn-blue" : "btn"}
      onClick={onClick}
      disabled={disable}
      >
      {text}
    </div>
  );
}

export default Button;
