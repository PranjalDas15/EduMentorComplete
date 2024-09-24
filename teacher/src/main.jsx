import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.jsx'
import './index.css'

export const Context = React.createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [message, setMessage] = React.useState([]);
  const [teacher, setTeacher] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  
  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated,message, setMessage,teacher, setTeacher, users, setUsers }}
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
)
