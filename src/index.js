import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import {DappProvider} from "./providers/DappProvider";
import NFTDetail from "./pages/NFTDetail";

ReactDOM.render(
  <DappProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/detail" element={<NFTDetail />} />
      </Routes>
    </BrowserRouter>
  </DappProvider>,
  document.getElementById("root")
);

reportWebVitals();
