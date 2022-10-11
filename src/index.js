import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import Activity from "./pages/Activity";
import {DappProvider} from "./providers/DappProvider";
import NFTDetail from "./pages/NFTDetail";
import Resell from "./pages/Resell";
import MyNFT from "./pages/MyNFT";
import Listing from "./pages/Listing";

ReactDOM.render(
  <DappProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/detail" element={<NFTDetail />} />
        <Route path="/resell" element={<Resell />} />
        <Route path="/myNFT" element={<MyNFT />} />
        <Route path="/listings" element={<Listing />} />
      </Routes>
    </BrowserRouter>
  </DappProvider>,
  document.getElementById("root")
);

reportWebVitals();
