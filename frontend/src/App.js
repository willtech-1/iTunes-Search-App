import React from "react";
// import react react router dom for routing
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Favourites from "./Components/Favourites.js";
import Search from "./Components/Search";
import './App.css'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Search />} exact />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
