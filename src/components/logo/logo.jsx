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
      <h1 className="nome-mark">Marisa Store</h1>
    </div>
  );
};

export default Logo;