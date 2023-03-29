import './App.css'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import Customers from './components/Customers/Customers'
import Estimates from './components/Estimates/Estimates'
import { Route, Routes} from 'react-router-dom'
import { DataProvider } from './context/DataContext'

function App() {

  return (
    <DataProvider>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Dashboard' element={<Dashboard />}></Route>
          <Route path='/Customers' element={<Customers />}></Route>
          <Route path='/Estimates' element={<Estimates />}></Route>
      </Routes>
    </DataProvider> 
  );
}

export default App;
