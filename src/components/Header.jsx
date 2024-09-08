import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MarvelLogo from "../pictures/marvel-logo-mini.png";
const Header = () => {
  return (
    <>
      <header>
        <section className="logo-sec">
          <Link to="/home">
            <img src={MarvelLogo} alt="logo-marvel" />
          </Link>
        </section>
        <section className="header-buttons">
          <Link to="/characters">
            <button>Characters</button>
          </Link>
          <Link to="/comics">
            <button>Comics</button>
          </Link>

          <Link to="/favorites">
            <button>Favorites</button>
          </Link>
          <button id="login-header">Log in</button>
        </section>
      </header>
    </>
  );
};

export default Header;
