import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MarvelLogo from "../pictures/marvel-logo-0.png";
const Header = () => {
  return (
    <>
      <header>
        <section className="logo-sec">
          <img src={MarvelLogo} alt="logo-marvel" />
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
        </section>
      </header>
    </>
  );
};

export default Header;
