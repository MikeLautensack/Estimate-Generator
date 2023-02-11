import './App.css'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import Customers from './components/Customers/Customers'
import Estimates from './components/Estimates/Estimates'
import EstimateGenerator from './components/EstimateGenerator/EstimateGenerator'
import { Route, Routes} from 'react-router-dom'

function App() {

  return (
      <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/Dashboard' element={<Dashboard />}></Route>
          <Route path='/Customers' element={<Customers />}></Route>
          <Route path='/Estimates' element={<Estimates />}></Route>
          <Route path='/EstimateGenerator' element={<EstimateGenerator />}></Route>
      </Routes>
        
      
  );
}

export default App;
