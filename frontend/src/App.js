import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Store from "./pages/store";
import Media from "./pages/Media";
import LoginSelection from "./pages/LoginSelection";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authView, setAuthView] = useState("selection"); 
  
  const [page, setPage] = useState("Home");  

  if (isLoggedIn) {
    if (isAdmin && page === "Admin") return <AdminPanel setPage={setPage} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} setAuthView={setAuthView} />;

    if (page === "Home") return <Home setPage={setPage} isAdmin={isAdmin} />;
    if (page === "store") return <Store setPage={setPage}/>;
    if (page === "Media") return <Media setPage={setPage} isAdmin={isAdmin} />;
    if (page === "Profile") return <Profile setPage={setPage} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} setAuthView={setAuthView} />;

    return <Home setPage={setPage} isAdmin={isAdmin} />;
  }

  return (
    <div>
      {authView === "selection" && <LoginSelection setAuthView={setAuthView} />}
      {authView === "user_login" && <Login setIsLoggedIn={setIsLoggedIn} setAuthView={setAuthView} setIsSignup={(val) => setAuthView(val ? "signup" : "user_login")} />}
      {authView === "admin_login" && <AdminLogin setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} setAuthView={setAuthView} setPage={setPage} />}
      {authView === "signup" && <Signup setIsSignup={(val) => setAuthView(val ? "signup" : "user_login")} />}
    </div>
  );
}

export default App;