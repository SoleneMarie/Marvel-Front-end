import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero2stan from "../pictures/Hero2stan.png";
import axios from "axios";

const Character = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const getCharacsFunc = async () => {
      try {
        const data = await axios.get("http://localhost:3000/characters");

        setLoading(false);
        setData(data.data);
      } catch (error) {
        console.log("message d'erreur page characters ==>" + error.response);
      }
    };
    getCharacsFunc();
  }, []);

  const characters = data.results;
  console.log(characters);
  console.log(
    "tableau de personnages ==>" + characters + "type :  " + typeof characters
  );

  return (
    <>
      <Header />
      <main>
        <section className="Stan-quote">
          <div className="pic-quote">
            <img src={Hero2stan} alt="Stan Lee picture" />
          </div>
          <div className="quotation">
            <p>
              "That personn who helps others, simply because it should or must
              be done, and because it's the right thing to do, is indeed without
              a doubt, a real superhero."
              <br />
              <span>Stan Lee</span>
            </p>
          </div>
        </section>
        <section id="characters-list">
          {characters.map((item, index) => {
            let imgpath = `${item.thumbnail.path}/standard_xlarge.jpg`;
            return (
              <>
                {Number(index) % 2 === 0 ? (
                  <section className="leftsec" id={item._id}>
                    <p>Section gauche</p>
                    <div className="character-pic">
                      <img src={imgpath} />
                    </div>
                    <div className="character-info">
                      <h2>{item.name}</h2>
                      {item.description && <p>{item.description}</p>}
                      <div className="character-comics-link">
                        <p>
                          Do you enjoy {item.name} comics? Maybe you can find a
                          new one here!
                        </p>
                        <button></button>
                      </div>
                    </div>
                  </section>
                ) : (
                  <section className="leftsec" id={item._id}>
                    <p>Section droite</p>
                    <div className="character-pic">
                      <img src={imgpath} />
                    </div>
                  </section>
                )}
              </>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Character;
