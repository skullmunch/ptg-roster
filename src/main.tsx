import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import MainPage from "./pages/MainPage";
import CreateRosterPage from "./pages/CreateRosterPage";
import RosterPage from "./pages/RosterPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/ptg-roster">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreateRosterPage />} />
        <Route path="/roster/:id" element={<RosterPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
