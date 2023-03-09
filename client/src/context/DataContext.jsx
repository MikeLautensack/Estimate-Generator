import { createContext, useState, useEffect } from "react"
import axios from 'axios'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [customers, setCustomers] = useState([])
    const [estimates, setEstimates] = useState([])

    const customerArr = []
    const estimateArr = []

    useEffect(() => {
        const getData = async () => {
            try {
              const userDataResponse = await axios.get('http://localhost:4000/users?id=1')
                .then(userDataResponse => {
                    userDataResponse.customers.forEach((customerID) => {
                        customerArr.push(customerID)
                    })
                    userDataResponse.estimates.forEach((estimateID) => {
                        estimateArr.push(estimateID)
                    })
                })
            } catch (err) {
              console.error(err)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        
    }, [customerArr])

    useEffect(() => {
        
    }, [estimateArr])

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