import React from 'react'
import './css/EstimateListItem.css'

const Estimate = ({ estimate,
                    setEstimateFormRendered,
                    deleteEstimate,
                    setEstimateRendered,
                    setEditEstimateData}) => {
  return (
    <div onDoubleClick={() => setEstimateRendered(true)} className='estimate-li'>
        <div className='estimate-li-data'>
            <p>{estimate.estimateName}</p>
            <p>{estimate.customerName}</p>
            <p>{estimate.address}</p>
        </div>
        <div className='estimate-li-button-box'>
            <button onClick={() => (setEstimateFormRendered(true), setEditEstimateData(estimate))} className='edit-estimate'>Edit</button>
            <button onClick={() => deleteEstimate(estimate.id)} className='delete-estimate'>Delete</button>
        </div>
    </div>
  )
}

export default Estimate