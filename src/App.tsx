import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateRosterPage from "./pages/CreateRosterPage";
import RosterPage from "./pages/RosterPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreateRosterPage />} />
        <Route path="/roster/:id" element={<RosterPage />} />
      </Routes>
    </HashRouter>
  );
}
