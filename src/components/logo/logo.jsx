import React from "react";
import paramsData from "../../params.json";
import "./logo.css";

const Logo = () => {

  return (
    <div className="logo-view">
      <img
        src="/logo1.png"
        alt="Logo"
        className="logo-image"
      />
      <h1 className="nome-mark">{paramsData[0].Title}</h1>
    </div>
  );
};

export default Logo;