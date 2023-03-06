import { createContext, useState, useEffect } from "react"
import axios from 'axios'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [customers, setCustomers] = useState()
    const [estimates, setEstimates] = useState()

    /*useEffect(() => {
        const getData = async () => {
            try {
              const userDataResponse = await axios.get('http://localhost:4000/users?id=1')
              const userData = await userDataResponse.data.users[0]
              setUser(userData)
              const customerIdList = await userData.data.users[0].customers
              const estimatesIdList = await userData.data.users[0].estimates
              const customerData = await axios.get(`http://localhost:4000/customers?id=${customerIdList}`)
              const estimateData = await axios.get(`http://localhost:4000/estimates?id=${estimatesIdList}`)
              
              setCustomers(customerData)
              setEstimates(estimateData)
            } catch (err) {
              console.error(err)
            }
        }
        getData()
    }, [])*/

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