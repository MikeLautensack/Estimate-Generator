import './App.css';
import React, { useState } from 'react';
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard';
import EstimateGenerator from './components/EstimateGenerator/EstimateGenerator';

function App() {

  //const [user, setUser] = useState

  return (
    <>
      <Home />
      <Dashboard />
      <EstimateGenerator />
    </>
  );
}

export default App;
