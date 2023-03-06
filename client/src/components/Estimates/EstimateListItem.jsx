import React from 'react'
import './css/EstimateListItem.css'

const Estimate = ({ estimate,
                    estimateID,
                    estimateName,
                    customerName,
                    estimateAddress,
                    deleteEstimate,
                    setEstimateRendered}) => {
  return (
    <div onDoubleClick={() => setEstimateRendered(true)} className='estimate-li'>
        <div className='estimate-li-data'>
            <p>{estimateName}</p>
            <p>{customerName}</p>
            <p>{estimateAddress}</p>
        </div>
        <div className='estimate-li-button-box'>
            <button className='edit-estimate'>Edit</button>
            <button onClick={() => deleteEstimate(estimateID)} className='delete-estimate'>Delete</button>
        </div>
    </div>
  )
}

export default Estimate