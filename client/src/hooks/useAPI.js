import DataContext from '../context/DataContext'
import axios from 'axios'
import { useContext } from 'react'

const useAPI = () => {

    const { setCustomers, setEstimates} = useContext(DataContext)

    const getCustomers = async (token) => {
        const response = await axios.get('http://193.46.198.215:9000/customers/get', { headers: { Authorization: `Bearer ${token}` } })
        setCustomers(response.data)
        localStorage.setItem('customers', JSON.stringify(response.data))
    }
       
    const getEstimates = async (token) => {
        const response = await axios.get('http://193.46.198.215:9000/estimates/get', { headers: { Authorization: `Bearer ${token}` } })
        setEstimates(response.data)
        localStorage.setItem('estimates', JSON.stringify(response.data))
    }

    const addCustomer = async (token, customer) => {
        await axios.post('http://193.46.198.215:9000/customers/add', customer, { headers: { Authorization: `Bearer ${token}` } })
    }

    const addEstimate = async (token, estimate) => {
        await axios.post('http://193.46.198.215:9000/estimates/add', estimate, { headers: { Authorization: `Bearer ${token}` } })
    }

    const updateCustomer = async (token, customer, id) => {
        await axios.put(`http://193.46.198.215:9000/customers/update/${id}`, customer, { headers: { Authorization: `Bearer ${token}` }})
    }

    const updateEstimate = async (token, estimate, id) => {
        await axios.put(`http://193.46.198.215:9000/estimates/update/${id}`, estimate, { headers: { Authorization: `Bearer ${token}` }})
    }

    const deleteCustomer = async (token, customer, id) => {
        await axios.delete(`http://193.46.198.215:9000/customers/delete/${id}`, { headers: { Authorization: `Bearer ${token}` }})
    }

    const deleteEstimate = async (token, estimate, id) => {
        await axios.delete(`http://193.46.198.215:9000/estimates/delete/${id}`, { headers: { Authorization: `Bearer ${token}` }})
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