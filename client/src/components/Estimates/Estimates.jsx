import React, { useReducer, useContext, useEffect } from 'react'
import Nav from '../Nav/Nav'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import './css/Estimates.css'
import EstimateListItem from './EstimateListItem'
import EstimateForm from './EstimateForm'
import Estimate from './Estimate'
import UserContext from '../../context/DataContext'

const reducer = (estimates, action) => {
    switch(action.type) {
        case 'load':
            return action.payload
        case 'add':
          return [...estimates, action.payload]
        case 'edit':
          return estimates.map((estimate) => {
            if(estimate.id === action.payload.id) {
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

  const userData = useContext(UserContext)
  const { estimates, setEstimates } = userData
  const [estimatesList, dispatch] = useReducer(reducer, [])
  const [editEstimateData, setEditEstimateData] = useState()
  const [estimateRendered, setEstimateRendered] = useState(false)
  const [estimateFormRendered, setEstimateFormRendered] = useState(false)
  const [navVis, setNavVis] = useState(false)

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

  const addEstimate = (estimate) => {
      dispatch({ type: 'add', payload: estimate})
      const list = [...estimates, estimate]
      setEstimates(list)
  }

  const editEstimate = (estimate) => {
      dispatch({ type: 'edit', payload: estimate})
      const list = [...estimates, 
        estimates.map((est) => {
          if(est.id === estimate.id) {
            return estimate
          } else {
            return est
          }
        })]
      setEstimates(list)
  }

  const deleteEstimate = (id) => {
    const list = estimatesList.filter((estimate) => estimate.id !== id)
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
          <button onClick={() => setEstimateFormRendered(true)} className='new-estimate-button'>New Estimate</button>
        </div>
        <div className='estimates-card'>
            <ul className='estimate-list'>
                {estimatesList.map((estimate) => (
                  <li key={estimate.id}>
                    <EstimateListItem
                        estimate={estimate}
                        setEstimateFormRendered={setEstimateFormRendered}
                        setEditEstimateData={setEditEstimateData}
                        deleteEstimate={deleteEstimate}
                        setEstimateRendered={setEstimateRendered}/>
                  </li>
                ))}
            </ul>
        </div>
        {estimateRendered === true && <Estimate 
            setEstimateRendered={setEstimateRendered}
            addEstimate={addEstimate}/>}
        {estimateFormRendered === true && <EstimateForm 
            setEstimateFormRendered={setEstimateFormRendered}
            addEstimate={addEstimate}
            editEstimate={editEstimate}
            editEstimateData={editEstimateData}
            setEditEstimateData={setEditEstimateData}/>}
      </div>
    </div>
  )
}

export default Estimates