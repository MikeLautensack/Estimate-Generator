import './App.css'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import Customers from './components/Customers/Customers'
import Estimates from './components/Estimates/Estimates'
import { Route, Routes} from 'react-router-dom'
import { useEffect, useContext } from 'react'
import DataContext from './context/DataContext'

function App() {

  const { setUser, 
          setJWT, 
          customers, 
          setCustomers, 
          setEstimates,
          setEstimate } = useContext(DataContext)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    setJWT(JSON.parse(localStorage.getItem('jwt')))
    setCustomers(JSON.parse(localStorage.getItem('customers')))
    setEstimates(JSON.parse(localStorage.getItem('estimates')))
    setEstimate(JSON.parse(localStorage.getItem('estimate')))
    console.log('app comp' + customers)
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/Dashboard' element={<Dashboard />}></Route>
      <Route path='/Customers' element={<Customers />}></Route>
      <Route path='/Estimates' element={<Estimates />}></Route>
    </Routes> 
  );
}

export default App;
