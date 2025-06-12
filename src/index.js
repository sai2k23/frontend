import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ✅ Apply dark mode from localStorage BEFORE rendering
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark") {
  document.documentElement.classList.add("dark");
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


