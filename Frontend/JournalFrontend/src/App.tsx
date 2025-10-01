import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NewEntry from "./pages/NewEntry";
import JournalEntries from "./pages/JournalEntries";
import Home from "./pages/Home";
import EditEntry from "./pages/EditEntry";
import LoginPage from "./pages/authpage/LoginPage";
import RegisterPage from "./pages/authpage/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="add-entry" element={<ProtectedRoute><NewEntry /></ProtectedRoute>} />
        <Route path="edit-entry/:id" element={<ProtectedRoute><EditEntry /></ProtectedRoute>} />
        <Route path="entries" element={<ProtectedRoute><JournalEntries /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
