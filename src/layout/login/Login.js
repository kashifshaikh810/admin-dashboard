import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CustomAlert from '../../components/Alert'
import { API_END_POINT } from '../DefaultLayout'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const [error, setError] = useState('') // Store validation errors
  const navigate = useNavigate()

  const validateForm = () => {
    if (!email && !password) {
      setError('Email & Password are required!')
      return false
    }

    if (!email) {
      setError('Email are required!')
      return false
    }
    if (!password) {
      setError('Password are required!')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address!')
      return false
    }
    setError('') // Clear errors if validation passes
    return true
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await axios
        .post(`${API_END_POINT}/admin/login`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data?.success) {
            localStorage.setItem('data', JSON.stringify(res.data))
            navigate('/dashboard')
            setIsLoading(false)
          } else {
            setError(res.data?.msg)
            setIsLoading(false)
          }
        })
        .catch((err) => {
          setError(err?.message)
          setIsLoading(false)
        })
    } catch (err) {
      setError(err?.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmitHandler}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>

                    {/* Show error message if validation fails */}
                    {error && <CustomAlert type="danger" message={error} />}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setError('')
                        }}
                        autoComplete="username"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          setError('')
                        }}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          disabled={isLoading}
                          color="success text-light"
                          className="px-4"
                          type="submit"
                        >
                          {isLoading ? 'Wating....' : 'Login'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="text-white bg-success py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Welcome to Admin Dashboard</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
