import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from 'react-hot-toast';

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route
          path="/setting"
          element={authUser ? <SettingsPage /> : <Navigate to={"/login"} />}
        />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
