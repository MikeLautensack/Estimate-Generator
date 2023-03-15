import { createContext, useState, useEffect } from "react"
import axios from 'axios'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [customers, setCustomers] = useState([])
    const [estimates, setEstimates] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
          const response = await axios.get('http://localhost:4000/users?id=1')
          getCustomers(response.data[0].customers)
          getEstimates(response.data[0].estimates)
          setUser    
        } catch (err) {
          console.error(err)
        }
    }

    const getCustomers = async (customerArr) => {
        try {
            const response = await axios.get(`http://localhost:4000/customers?id=${customerArr.join(',')}`)
            setCustomers(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    const getEstimates = async (estimateArr) => {
        try {
            const response = await axios.get(`http://localhost:4000/estimates?id=${estimateArr.join(',')}`)
            setEstimates(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <DataContext.Provider value={{user,
                                      setUser,
                                      customers,
                                      setCustomers,
                                      estimates,
                                      setEstimates}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext