import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import MainPage from "./pages/MainPage";
import CreateRosterPage from "./pages/CreateRosterPage";
import RosterPage from "./pages/RosterPage";
import TutorialPage from "./pages/TutorialPage";
import ChangelogPage from "./pages/ChangelogPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/ptg-roster">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreateRosterPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/roster/:id" element={<RosterPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
