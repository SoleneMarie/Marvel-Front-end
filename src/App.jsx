import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Characters from "./Routes/Characters";

function App() {
  const [token, setToken] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home token={token} />} />
          <Route path="/characters" element={<Characters />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
