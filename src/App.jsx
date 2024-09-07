import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Characters from "./Routes/Characters";
import Comics from "./Routes/Comics";
import ComicsCharacters from "./Routes/Comics-characters";
import Comic from "./Routes/Comic";
import Character from "./Routes/Character";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comics/:characterId" element={<ComicsCharacters />} />
          <Route path="/comic/:id" element={<Comic />} />
          <Route path="/character/:id" element={<Character />} />;
        </Routes>
      </Router>
    </>
  );
}

export default App;
