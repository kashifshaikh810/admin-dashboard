import React from 'react'

const Spinner = ({height}) => {
  return (
    <div
      style={{
        height: height || 200,
        minHeight: height || 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden" >Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
