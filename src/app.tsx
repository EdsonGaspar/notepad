import React, { useState } from "react";
import Register from "./components/register";
import Login from "./components/logint";
import ProtectedPage from "./components/protected-page";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleRegisterSuccess = () => setIsAuthenticated(false);
  const handleLoginSuccess = (name: string) => {
    setCurrentUser(name);
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setCurrentUser("");
    setIsAuthenticated(false);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />

          <Register onRegisterSuccess={handleRegisterSuccess} />
        </>
      ) : (
        <ProtectedPage onLogout={handleLogout} name={currentUser} />
      )}
    </div>
  );
};

export default App;
