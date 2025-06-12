import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ContactSection from "./components/ContactSection.jsx";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { UserProvider } from "./context/UserContext.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Upload from "./pages/Upload.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import Visualize from "./pages/Visualize.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/Admin.jsx";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="font-sans scroll-smooth">
      <UserProvider>
        <Router>
          <Routes>
            {/* 🔵 Landing Page */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />
                  <Features />
                  <ContactSection />
                </>
              }
            />

            {/* 🟣 Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/visualize"
              element={
                <ProtectedRoute>
                  <Visualize />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer position="top-center" autoClose={3000} />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
