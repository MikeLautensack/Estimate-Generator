import './App.css';
import React, { useState } from 'react';
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard';
import EstimateGenerator from './components/EstimateGenerator/EstimateGenerator';
import Customers from './components/Customers/Customers'
import Estimates from './components/Estimates/Estimates'

function App() {

  //const [user, setUser] = useState

  return (
    <>
      <Home />
      <Dashboard />
      <Customers />
      <Estimates />
      <EstimateGenerator />
    </>
  );
}

export default App;
