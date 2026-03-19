import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  // If logged in → show Home
  if (isLoggedIn) {
    return <Home />;
  }

  // Otherwise show Login or Signup
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