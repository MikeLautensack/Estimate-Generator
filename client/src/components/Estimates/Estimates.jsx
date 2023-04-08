import React, { useReducer, useContext, useEffect } from 'react'
import Nav from '../Nav/Nav'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import './css/Estimates.css'
import EstimateListItem from './EstimateListItem'
import EstimateForm from './EstimateForm'
import Estimate from './Estimate'
import DataContext from '../../context/DataContext'
import useAPI from '../../hooks/useAPI.js'
import { FaPlus } from "react-icons/fa"

const reducer = (estimates, action) => {
    switch(action.type) {
        case 'load':
            return action.payload
        case 'add':
          return [...estimates, action.payload]
        case 'edit':
          return estimates.map((estimate) => {
            if(estimate._id === action.payload._id) {
              return action.payload
            } else {
              return estimate
            }
          })
        case 'delete':
          return action.payload
    }
}

const Estimates = () => {

  const data = useContext(DataContext)
  const { jwt, estimates, setEstimates } = data
  const [estimatesList, dispatch] = useReducer(reducer, [])
  const [editEstimateData, setEditEstimateData] = useState()
  const [estimateRendered, setEstimateRendered] = useState(false)
  const [estimateFormRendered, setEstimateFormRendered] = useState(false)
  const [navVis, setNavVis] = useState(false)
  const { addEstimate, updateEstimate, deleteEstimate } = useAPI()

  useEffect(() => {
    dispatch({ type: 'load', payload: estimates})
  }, [])

  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }

  }

  const add = (estimate) => {
      dispatch({ type: 'add', payload: estimate})
      const list = [...estimates, estimate]
      setEstimates(list)
      addEstimate(jwt, estimate)
  }

  const edit = (estimate) => {
      dispatch({ type: 'edit', payload: estimate})
      const list = [...estimates, 
        estimates.map((est) => {
          if(est._id === estimate._id) {
            return estimate
          } else {
            return est
          }
        })]
      setEstimates(list)
      updateEstimate(jwt, estimate, estimate._id)
  }

  const deleteEst = (_id) => {
    const list = estimatesList.filter((estimate) => {
      if(estimate._id !== _id) {
        return estimate
      }
      deleteEstimate(jwt, estimate, estimate._id)
    })
    dispatch({ type: 'delete', payload: list})
    setEstimates(list)
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
        </div>
        <div className='estimates-card'>
            <div className='add-estimate-icon-box'>
              <FaPlus onClick={() => setEstimateFormRendered(true)} className='add-estimate-icon'/>
            </div>
            <ul className='estimate-list'>
                {estimatesList.map((estimate) => (
                  <li key={estimate._id}>
                    <EstimateListItem
                        estimate={estimate}
                        setEstimateFormRendered={setEstimateFormRendered}
                        setEditEstimateData={setEditEstimateData}
                        deleteEst={deleteEst}
                        setEstimateRendered={setEstimateRendered}/>
                  </li>
                ))}
            </ul>
        </div>
        {estimateRendered === true && <Estimate 
            setEstimateRendered={setEstimateRendered}
            estimate={editEstimateData}/>}
        {estimateFormRendered === true && <EstimateForm 
            setEstimateFormRendered={setEstimateFormRendered}
            add={add}
            edit={edit}
            editEstimateData={editEstimateData}
            setEditEstimateData={setEditEstimateData}/>}
      </div>
    </div>
  )
}

export default Estimates