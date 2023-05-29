import DataContext from '../context/DataContext'
import axios from 'axios'
import { useContext } from 'react'

const useAPI = () => {

    const { setCustomers, setEstimates} = useContext(DataContext)

    const getCustomers = async (token) => {
        const response = await axios.get('http://localhost:9000/customers/get', { headers: { Authorization: `Bearer ${token}` } })
        setCustomers(response.data)
        localStorage.setItem('customers', JSON.stringify(response.data))
    }
       
    const getEstimates = async (token) => {
        const response = await axios.get('http://localhost:9000/estimates/get', { headers: { Authorization: `Bearer ${token}` } })
        setEstimates(response.data)
        localStorage.setItem('estimates', JSON.stringify(response.data))
    }

    const addCustomer = async (token, customer) => {
        const response = await axios.post('http://localhost:9000/customers/add', customer, { headers: { Authorization: `Bearer ${token}` } })
        console.log('Request object:', customer)
        console.log('Response object:', response)
    }

    const addEstimate = async (token, estimate) => {
        const response = await axios.post('http://localhost:9000/estimates/add', estimate, { headers: { Authorization: `Bearer ${token}` } })
        console.log('Request object:', estimate)
        console.log('Response object:', response)
    }

    const updateCustomer = async (token, customer, customerID) => {
        const response = await axios.put(`http://localhost:9000/customers/update/${customerID}}`, customer, { headers: { Authorization: `Bearer ${token}` }})
        console.log(response)
    }

    const updateEstimate = async (token, estimate, customerID) => {
        const response = await axios.put(`http://localhost:9000/estimates/update/${customerID}`, estimate, { headers: { Authorization: `Bearer ${token}` }})
        console.log(response)
    }

    const deleteCustomer = async (token, customer, customerID) => {
        const response = await axios.delete(`http://localhost:9000/customers/delete/${customerID}`, { headers: { Authorization: `Bearer ${token}` }})
        console.log(response)
    }

    const deleteEstimate = async (token, estimate, customerID) => {
        const response = await axios.delete(`http://localhost:9000/estimates/delete/${customerID}`, { headers: { Authorization: `Bearer ${token}` }})
        console.log(response)
    }

  return {
    getCustomers,
    getEstimates,
    addCustomer,
    addEstimate,
    updateCustomer,
    updateEstimate,
    deleteCustomer,
    deleteEstimate
  }
}

export default useAPI