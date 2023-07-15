import React, { useReducer, useContext, useEffect } from 'react'
import Nav from '../Nav/Nav'
import { FaBars, FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import './css/Estimates.css'
import EstimateListItem from './EstimateListItem'
import EstimateForm from './EstimateForm'
import Estimate from './Estimate'
import DataContext from '../../context/DataContext'
import useAPI from '../../hooks/useAPI.js'

const reducer = (estimates, action) => {
    switch(action.type) {
        case 'load':
            return action.payload
        case 'add':
          return [...estimates, action.payload]
        case 'edit':
          return estimates.map((estimate) => {
            if(estimate.estimate_id === action.payload.estimate_id) {
              return action.payload
            } else {
              return estimate
            }
          })
        case 'delete':
          return action.payload
        default:
          throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const Estimates = () => {

  const { jwt, estimates, setEstimates } = useContext(DataContext)
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
      localStorage.setItem('estimates', JSON.stringify(list))
      addEstimate(jwt, estimate)
  }

  const edit = (estimate) => {
      dispatch({ type: 'edit', payload: estimate})
      const list = estimates.map((est) => {
          if(est.estimate_id === estimate.estimate_id) {
            return estimate
          } else {
            return est
          }
        })
      setEstimates(list)
      localStorage.setItem('estimates', JSON.stringify(list))
      updateEstimate(jwt, estimate, estimate.estimate_id)
  }

  const deleteEst = (estimate_id) => {
    const list = estimatesList.filter((estimate) => {
      if(estimate.estimate_id !== estimate_id) {
        return estimate
      }
      deleteEstimate(jwt, estimate, estimate.estimate_id)
    })
    dispatch({ type: 'delete', payload: list})
    setEstimates(list)
    localStorage.setItem('estimates', JSON.stringify(list))
}

  return (
    <div className='estimates'>
      <button className='estimates-sidebar-button' data-vis={navVis} onClick={changeNavVis}><FaBars /></button>
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
                  <li key={estimate.estimate_id}>
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
            setEstimateRendered={setEstimateRendered}
            add={add}
            edit={edit}
            editEstimateData={editEstimateData}
            setEditEstimateData={setEditEstimateData}/>}
      </div>
    </div>
  )
}

export default Estimates