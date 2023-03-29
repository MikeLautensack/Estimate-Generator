import { createContext, useState } from "react"

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [jwt, setJWT] = useState()
    const [customers, setCustomers] = useState([])
    const [estimates, setEstimates] = useState([])

    return (
        <DataContext.Provider value={{user,
                                      setUser,
                                      jwt,
                                      setJWT,
                                      customers,
                                      setCustomers,
                                      estimates,
                                      setEstimates}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext