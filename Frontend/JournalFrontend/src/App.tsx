import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NewEntry from "./pages/NewEntry";
import JournalEntries from "./pages/JournalEntries";
import Home from "./pages/Home";
import EditEntry from "./pages/EditEntry";
import LoginPage from "./pages/authpage/LoginPage";
import RegisterPage from "./pages/authpage/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<Home />} />
        <Route path="add-entry" element={<NewEntry />} />
        <Route path="edit-entry/:id" element={<EditEntry />} />
        <Route path="entries" element={<JournalEntries />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
