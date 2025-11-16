import React from "react";
import dataJson from "../../data.json";
import "./logo.css";

const Logo = () => {
  const rawTitle = dataJson?.config?.Title ?? "";
  const titleParts = rawTitle.trim().split(/\s+/).filter(Boolean);
  const lastWord = titleParts.pop() ?? "";
  const leadingText = titleParts.join(" ");
  const showHat = lastWord.length > 0;
  const hatImageSrc = "/assets/pngegg.png";

  return (
    <div className="logo-view">
      <img
        src="/logo.png"
        alt="Logo"
        className="logo-image"
      />
      <h1 className="nome-mark">
        <span className="nome-mark__text">
          {leadingText && `${leadingText} `}
          {showHat ? (
            <span className="nome-mark__lastword">
              {lastWord}
              <img
                src={hatImageSrc}
                alt="Chapeu de Natal"
                className="nome-mark__hat"
              />
            </span>
          ) : (
            rawTitle
          )}
        </span>
      </h1>
    </div>
  );
};

export default Logo;