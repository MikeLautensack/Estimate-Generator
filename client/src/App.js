import './App.css';
import Login from './components/Login'
import React, { useState } from 'react';

function App() {

  //const [user, setUser] = useState

  return (
    <div className="flex flex-col justify-center items-center bg-blue-100 h-screen">
      <div className='text-center w-[80%]'>
        <h3>Welcome</h3>
        <h6>to</h6>
        <h1>Estimate Generator</h1>
      </div>
      <Login />
    </div>
  );
}

export default App;
