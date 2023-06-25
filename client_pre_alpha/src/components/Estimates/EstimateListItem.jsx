import React from 'react'
import './css/EstimateListItem.css'
import { FaTrashAlt, FaEdit } from "react-icons/fa"

const Estimate = ({ estimate,
                    setEstimateFormRendered,
                    deleteEst,
                    setEstimateRendered,
                    setEditEstimateData}) => {
  return (
    <div onDoubleClick={() => (setEstimateRendered(true), setEditEstimateData(estimate))} className='estimate-li'>
        <div className='estimate-li-data'>
            <p>{estimate.estimateName}</p>
            <p>{estimate.customerName}</p>
            <p>{estimate.address}</p>
        </div>
        <div className='estimate-li-button-box'>
            <FaEdit onClick={() => (setEstimateFormRendered(true), setEditEstimateData(estimate))} className='edit-estimate'/>
            <FaTrashAlt onClick={() => deleteEst(estimate.estimate_id)} className='delete-estimate'/>
        </div>
    </div>
  )
}

export default Estimate