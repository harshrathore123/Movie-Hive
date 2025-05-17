import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./component/navbar/Navbar";
import Signup from "./component/signup/Signup";
import Home from "./page/home/Home";
import Login from "./component/login/Login";
import SideDrawer from "./component/side-drawer/Side_Drawer";
import UserDetails from "./component/user-details/UserDetails";
import Authentication_Navbar from "./component/authentication_navbar/Authentication_Navbar";
import Movies from "./component/movies/Movies";
import WebSeries from "./component/webseries/WebSeries";
import Profile from "./component/profile/Profile";
// import Favorite from "./component/favorites/Favorite";
import News from "./component/news/News";
import ChangePassword from "./component/changepassword/ChangePassword";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./component/reset_password/ResetPassword";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) === true
  );
  

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <>
    <Router>
    <UserDetails isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      {/* Navbar Updates Based on Auth Status */}
      {isAuthenticated ? (
        <Authentication_Navbar setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Navbar />
      )}

      {/* ✅ SideDrawer Always Visible */}
      <SideDrawer />

      <Routes>
        {/* Public Routes (Accessible Before Login) */}
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/movies" />} />
        )}

        {/* Protected Routes (Require Authentication) */}
        {isAuthenticated ? (
          <>
            <Route path="/profile" element={<Profile  />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/webseries" element={<WebSeries />} />
            {/* <Route path="/favorites" element={<Favorite />} /> */}
            <Route path="/news" element={<News/>} />
            <Route path="/logout" element={<Navigate to="/" />} />
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/reset-password" element={<ResetPassword/>}/>

          </>
        ) : (
          <Route path="/movies" element={<Navigate to="/login" />} />
        )}

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/movies" : "/"} />} />
      </Routes>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
