import React, { useState } from "react";
import Login from "./components/login";
import Register from "./components/register";
import ProtectedPage from "./components/protected-page";
import "./index.css";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    "login" | "register" | "protected"
  >("login");
  const [currentUser, setCurrentUser] = useState("");

  const handleLoginSuccess = (name: string) => {
    setCurrentUser(name);
    setCurrentPage("protected");
  };

  const handleLogout = () => {
    setCurrentUser("");
    setCurrentPage("login");
  };

  return (
    <div>
      {currentPage === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={() => setCurrentPage("register")}
        />
      )}
      {currentPage === "register" && (
        <Register onRegisterSuccess={() => setCurrentPage("login")} />
      )}
      {currentPage === "protected" && (
        <ProtectedPage name={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import Register from "./components/register";
// import Login from "./components/logint";
// import ProtectedPage from "./components/protected-page";
// import "./index.css";

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentUser, setCurrentUser] = useState("");

//   const handleRegisterSuccess = () => setIsAuthenticated(false);
//   const handleLoginSuccess = (name: string) => {
//     setCurrentUser(name);
//     setIsAuthenticated(true);
//   };
//   const handleLogout = () => {
//     setCurrentUser("");
//     setIsAuthenticated(false);
//   };

//   return (
//     <div>
//       {!isAuthenticated ? (
//         <>
//           <Login onLoginSuccess={handleLoginSuccess} />

//           <Register onRegisterSuccess={handleRegisterSuccess} />
//         </>
//       ) : (
//         <ProtectedPage onLogout={handleLogout} name={currentUser} />
//       )}
//     </div>
//   );
// };

// export default App;
