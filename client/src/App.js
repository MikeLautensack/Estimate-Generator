import './App.css'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import Customers from './components/Customers/Customers'
import Estimates from './components/Estimates/Estimates'
import { Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react'

function App() {

  /*const USERS_API_URL = "http://localhost:4000/users"
  const CUSTOMERS_API_URL = "http://localhost:4000/customers"
  const ESTIMATES_API_URL = "http://localhost:4000/estimates"

  const [users, setUsers] = useState()
  const [customers, setCustomers] = useState()
  const [estimates, setEstimates] = useState()

  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(USERS_API_URL)
          const users = await response.json()
          console.log(users)
          setUsers(users)
        } catch (err) {
          console.log(err)
        }
      }
      const fetchCustomers = async () => {
        try {
          const response = await fetch(CUSTOMERS_API_URL)
          const users = await response.json()
          console.log(users)
          setUsers(users)
        } catch (err) {
          console.log(err)
        }
      }
      const fetchEstimates = async () => {
        try {
          const response = await fetch(ESTIMATES_API_URL)
          const users = await response.json()
          console.log(users)
          setUsers(users)
        } catch (err) {
          console.log(err)
        }
      }

      (async () => await fetchUsers())()
      (async () => await fetchCustomers())()
      (async () => await fetchEstimates())()
  }, [])*/

  return (
      <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/Dashboard' element={<Dashboard />}></Route>
          <Route path='/Customers' element={<Customers />}></Route>
          <Route path='/Estimates' element={<Estimates />}></Route>
      </Routes>
        
      
  );
}

export default App;
