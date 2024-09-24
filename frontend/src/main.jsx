import { createContext, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

export const Context = createContext({ isAuthenticated: false, user: {}, teachers: [] });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, teachers, setTeachers, appointments, setAppointments }}>
      <App />
    </Context.Provider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
