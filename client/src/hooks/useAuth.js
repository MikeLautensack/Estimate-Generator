import DataContext from '../context/DataContext'
import axios from 'axios'
import { useContext } from 'react'
import useAPI from '../hooks/useAPI.js'
import { useNavigate } from 'react-router-dom'
import Login from '../components/Home/Login.jsx'

const useAuth = () => {

    const { setUser, setJWT, setCustomers, setEstimates} = useContext(DataContext)
    
    const logoutUser = () => {
        setUser(null)
        setJWT(null)
        setCustomers(null)
        setEstimates(null)
    }
    
    

  return {
    logoutUser
  }
}

export default useAuth