import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import marvelLogo from "../pictures/marvel-logo-0.png";

const Home = ({ token }) => {
  return (
    <>
      <main className="black-bk">
        <section className="width-lim">
          <section id="home-menu">
            <section id="black-menu">
              <div id="logo-div">
                <img src={marvelLogo} alt="logo de marvel" />
              </div>
              <div id="buttons-menu">
                <Link to="/characters">
                  <button className="home-button">
                    Find your favorite characters
                  </button>
                </Link>
                <Link
                  to="/comics
               "
                >
                  <button className="home-button">
                    Discover new (and old) comics
                  </button>
                </Link>
                {token === true ? (
                  <button id="logout-button">Log out</button>
                ) : (
                  <button id="login-button">Login</button>
                )}
              </div>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Home;
