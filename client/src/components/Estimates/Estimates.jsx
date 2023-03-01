import React from 'react'
import Nav from '../Nav/Nav'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import './css/Estimates.css'
import EstimateListItem from './EstimateListItem'
import EstimateForm from './EstimateForm'


const Estimates = () => {

  const [estimateGeneratorFormRendered, setEstimateGeneratorFormRendered] = useState(false)
  const [navVis, setNavVis] = useState(false)
  const [estimateList, setEstimateList] = useState([
    {
      "id": 1,
      "estimateName": "test1",
      "customerFirstName": "mike",
      "customerLastName": "Lautensack",
      "customerEmail": "email@gmail.com",
      "customerPhone": "123-456-7890",
      "address": "123 Example St",
      "tasks": [
          {
              "id": 1,
              "taskName": "task1",
              "taskTotal": 50.75,
              "taskDescription": "est 1 example",
              "subtasks": [
                  {
                      "id": 1,
                      "subtaskName": "subtask1",
                      "subtaskDescription": "subtask description example",
                      "calcMethod": "time and material",
                      "timeUnit": "hrs",
                      "timePricePerUnit": 10.25,
                      "timeQuantity": 3.0,
                      "timeSubtotal": 30.75,
                      "materialsUnit": "lnft",
                      "materialsPricePerUnit": 4.0,
                      "materialsQuantity": 5.0,
                      "materialsSubtotal": 20.0,
                      "unit": "",
                      "pricePerUnit": 0.0,
                      "quantity": 0.0,
                      "subtotal": 0.0,
                      "subtaskTotal": 50.75
                  }
              ]
          }
      ]
  },
  {
      "id": 2,
      "estimateName": "test2",
      "customerFirstName": "Walter",
      "customerLastName": "White",
      "customerEmail": "breakingbad@gmail.com",
      "customerPhone": "123-456-7890",
      "address": "675 google st",
      "tasks": [
          {
              "id": 1,
              "taskName": "task1",
              "taskTotal": 100.0,
              "taskDescription": "...",
              "subtasks": [
                  {
                      "id": 1,
                      "subtaskName": "subtask1",
                      "subtaskDescription": "...testing 1234",
                      "calcMethod": "sqft",
                      "timeUnit": "",
                      "timeQuantity": 0.0,
                      "timeSubtotal": 0.0,
                      "materialsUnit": "",
                      "materialsPricePerUnit": 0.0,
                      "materialsQuantity": 0.0,
                      "materialsSubtotal": 0.0,
                      "unit": "sqft",
                      "pricePerUnit": 2.0,
                      "quantity": 50.0,
                      "subtotal": 100.0,
                      "subtaskTotal": 100.0
                  }
              ]
          }
      ]
  },
  {
      "id": 3,
      "estimateName": "test3",
      "customerFirstName": "John",
      "customerLastName": "Snow",
      "customerEmail": "kinginthenorth@gmail.com",
      "customerPhone": "123-456-7890",
      "address": "123 winterfell ave",
      "tasks": [
          {
              "id": 1,
              "taskName": "task1",
              "taskTotal": 60.0,
              "taskDescription": "...",
              "subtasks": [
                  {
                      "id": 1,
                      "subtaskName": "subtask1",
                      "subtaskDescription": "rebuild the wall",
                      "calcMethod": "lnft",
                      "timeUnit": "",
                      "timeQuantity": 0.0,
                      "timeSubtotal": 0.0,
                      "materialsUnit": "",
                      "materialsPricePerUnit": 0.0,
                      "materialsQuantity": 0.0,
                      "materialsSubtotal": 0.0,
                      "unit": "lnft",
                      "pricePerUnit": 6.0,
                      "quantity": 10.0,
                      "subtotal": 60.0,
                      "subtaskTotal": 60.0
                  }
              ]
          }
      ]
  }])

  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }

  }

  const addEstimate = (inputData) => {

  }

  const editEstimate = (inputData) => {

  }

  const deleteEstimate = (id) => {
    const list = estimateList.filter((estimate) => estimate.id !== id)
    setEstimateList(list)
}

  return (
    <div className='estimates'>
      <button className='estimates-sidebar-button' onClick={changeNavVis}><FaBars /></button>
      <div className='estimates-sidebar' data-vis={navVis}>
        <Nav />
      </div>  
      <div className='estimates-content'>
        <div className='estimates-content-top'>
          <h1 className='estimate-heading'>Estimates</h1>
          <button onClick={() => setEstimateGeneratorFormRendered(true)} className='new-estimate-button'>New Estimate</button>
        </div>
        <div className='estimates-card'>
            <ul className='estimate-list'>
                {estimateList.map((estimate) => (
                  <li className='estimate-list-item'>
                    <EstimateListItem
                        estimate={estimate} 
                        estimateID={estimate.id}
                        estimateName={estimate.estimateName}
                        customerName={estimate.customerFirstName + " " + estimate.customerLastName}
                        estimateAddress={estimate.address}
                        deleteEstimate={deleteEstimate}/>
                  </li>
                ))}
            </ul>
        </div>
        {estimateGeneratorFormRendered === true && <EstimateForm 
            setEstimateGeneratorFormRendered={setEstimateGeneratorFormRendered}
            addEstimate={addEstimate}/>}
      </div>
    </div>
  )
}

export default Estimates