import React from 'react';
import './styles/App.css';
import HealthTest from "./components/HealthTest";
import ScanCode from "./components/ScanCode";

function App() {
  return (
    <div className="main-container">
     <h1>Titanbox !</h1>
      <ScanCode />
      <HealthTest />
    </div>
  );
}

export default App;
