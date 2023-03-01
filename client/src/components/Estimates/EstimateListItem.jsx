import React from 'react'
import './css/EstimateListItem.css'

const Estimate = ({ estimate,
                    estimateID,
                    estimateName,
                    customerName,
                    estimateAddress,
                    deleteEstimate}) => {
  return (
    <div className='estimate'>
        <div className='estimate-text'>
            <p className='estimate-labels'>{estimateName}</p>
            <p className='estimate-labels'>{customerName}</p>
            <p className='estimate-labels'>{estimateAddress}</p>
        </div>
        <div className='button-box'>
            <button className='edit-estimate'>Edit</button>
            <button onClick={() => deleteEstimate(estimateID)} className='delete-estimate'>Delete</button>
        </div>
    </div>
  )
}

export default Estimate