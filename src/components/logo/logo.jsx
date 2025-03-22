import React from "react";
import dataJson from "../../data.json";
import "./logo.css";

const Logo = () => {

  return (
    <div className="logo-view">
      <img
        src="/logo.png"
        alt="Logo"
        className="logo-image"
      />
      <h1 className="nome-mark">{dataJson.config.Title}</h1>
    </div>
  );
};

export default Logo;