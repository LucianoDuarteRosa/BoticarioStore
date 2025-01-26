import React from "react";
import "./logo.css";

const Logo= () => {
  return (
    <div className="logo-view">
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="logo-image" 
      />
      <h1 className="nome-mark">MARISA STORE</h1>
    </div>
  );
};

export default Logo;