import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import amazonData from './data/amazon.json';
import myntraData from './data/myntra.json';
import ajioData from './data/ajio.json';
import savanaData from './data/savana.json';

import GenderSelect from "./components/GenderSelect";
import Navbar from "./components/Navbar";
import ResultsGrid from "./components/ResultsGrid";
import "./App.css";

function App() {
  const [gender, setGender] = useState(null);
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const all = [...amazonData, ...myntraData, ...ajioData, ...savanaData];
    setAllProducts(all);

    const filtered = gender ? all.filter(item => item.gender === gender) : all;
    setResults(filtered);
  }, [gender]);

  return (
    <Router>
      <div className={`App ${gender}`}>
        {!gender ? (
          <GenderSelect setGender={setGender} />
        ) : (
          <>
            <Navbar setResults={setResults} allProducts={allProducts} gender={gender} setGender={setGender} />

            <Routes>
              <Route path="/" element={<ResultsGrid results={results} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
