import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import './index.css';

export const Context = React.createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [admin, setAdmin] = React.useState({});
  const [message, setMessage] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  
  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin, message, setMessage,teachers, setTeachers, users, setUsers }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AppWrapper />
    </Router>
  </React.StrictMode>
);
