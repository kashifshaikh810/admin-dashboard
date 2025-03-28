import React from 'react'
import { CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilWarning, cilXCircle, cilInfo } from '@coreui/icons'

const CustomAlert = ({ type = 'success', message }) => {
  // Define icon based on type
  const icons = {
    success: cilCheckCircle,
    warning: cilWarning,
    danger: cilXCircle,
    info: cilInfo,
  }

  return (
    <CAlert color={type} className="d-flex align-items-center">
      <CIcon icon={icons[type]} className="me-2" />
      <div>{message}</div>
    </CAlert>
  )
}

export default CustomAlert
