import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NewEntry from "./pages/NewEntry";
import JournalEntries from "./pages/JournalEntries";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<Home />} />
        <Route path="add-entry" element={<NewEntry />} />
        <Route path="entries" element={<JournalEntries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
