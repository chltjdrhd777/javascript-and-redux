import React from "react";
import logo from "./dist/img/logo.png";
import "./dist/Sass.scss";

export default () => {
  return (
    <div className="SassComponent">
      <header className="header">
        <img src={logo} alt="logo" className="header_logo" />

        <form className="search">
          <input
            type="text"
            className="search_field"
            placeholder="Search your recipes"
          />
          <button className="btn search_btn"></button>
        </form>
      </header>
    </div>
  );
};
