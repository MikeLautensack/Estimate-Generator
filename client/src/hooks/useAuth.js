import DataContext from '../context/DataContext'
import axios from 'axios'
import { useContext } from 'react'
import useAPI from '../hooks/useAPI.js'

const useAuth = () => {

    const { user, setUser, setJWT, setCustomers, setEstimates} = useContext(DataContext)
    const { getCustomers, getEstimates } = useAPI()

    const loginUser = async (email, password) => {
        return axios.post('http://localhost:5000/users/login', {
            email,
            password
        })
        .then(response => {
            if(response.data) {
                setUser(response.data)
                setJWT(response.data.token)
                getCustomers(response.data.token)
                getEstimates(response.data.token)
            }
        })
    }
    
    const logoutUser = () => {
        setUser(null)
        setJWT(null)
        setCustomers(null)
        setEstimates(null)
    }
    
    const registerUser = async (username,
                            email, 
                            password, 
                            password1) => {
        return axios.post('http://localhost:5000/users/register', {
            username,
            email,
            password,
            password1
        })
        .then(response => {
            if(response.data) {
                setUser(response.data)
                setJWT(response.data.token)
            }
        })
    }

  return {
    loginUser,
    logoutUser,
    registerUser
  }
}

export default useAuth