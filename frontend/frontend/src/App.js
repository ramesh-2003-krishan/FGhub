import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  
  if (isLoggedIn) {
    return <Home />;
  }

  
  return (
    <div>
      {isSignup ? (
        <Signup setIsSignup={setIsSignup} />
      ) : (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setIsSignup={setIsSignup}
        />
      )}
    </div>
  );
}

export default App;