import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Link, Outlet, useNavigate } from 'react-router-dom'
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
  CFormTextarea,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilImage,
  cilText,
  cilDescription,
  cilImagePlus,
  cilLocationPin,
  cilChevronCircleRightAlt,
} from '@coreui/icons'
import CustomAlert from '../components/Alert'
import Spinner from '../components/Spinner'
import axios from 'axios'

export const API_END_POINT = 'https://appsdemo.pro/AgentsPay/api'

const allUsersSection = ({ data, loading, setIsShowAddImages, getAllBanners }) => {
  const nav = useNavigate()
  const [isDeleting, setIsDeleting] = useState({ loading: false, index: '' })

  const deleteBanner = async (item, index) => {
    try {
      setIsDeleting({ loading: true, index: index })
      await axios
        .post(`${API_END_POINT}/admin/deleteBanner?bannerId=${item?._id}`)
        .then((res) => {
          getAllBanners()
          setTimeout(() => {
            setIsDeleting({ loading: false, index: index })
          }, 1000)
        })
        .catch((err) => {
          setIsDeleting({ loading: false, index: index })
        })
    } catch (error) {
      console.error('Error deleting banner:', error)
      setIsDeleting({ loading: false, index: index })
    }
  }

  return (
    <CContainer>
      <CCol md={12}>
        <CCardGroup>
          <CCard className="">
            <CCardBody className="">
              <h3>All Banners</h3>
              <CRow>
                {loading ? (
                  <Spinner />
                ) : !data?.length ? (
                  <CCol md={12} className="text-center mt-4">
                    <h5 className="text-secondary">No data available</h5>
                  </CCol>
                ) : (
                  <>
                    {/* Show "Add Image" card only the first time */}
                    {data.length > 0 && (
                      <CCol md={3} className="d-flex items-center m-4 mt-0 ml-0">
                        <CCardGroup>
                          <CCard
                            className="p-3 d-flex justify-content-center align-items-center flex-column"
                            style={{ width: 335, height: 349 }}
                          >
                            <CCard
                              className="p-3 d-flex justify-content-center align-items-center flex-column"
                              style={{ height: '40vh', width: '99%', cursor: 'pointer' }}
                              onClick={() => setIsShowAddImages(true)}
                            >
                              <CIcon icon={cilImagePlus} size="5xl" />
                            </CCard>
                          </CCard>
                        </CCardGroup>
                      </CCol>
                    )}

                    {/* Render data cards */}
                    {data.map((item, index) => (
                      <CCol key={index} md={3} className="d-flex items-center m-4 mt-0 ml-0">
                        <CCardGroup>
                          <CCard>
                            <CCardBody className="d-flex flex-column items-center">
                              <img
                                src={`https://appsdemo.pro/AgentsPay/${item?.bannerImage}`}
                                className="rounded"
                                style={{ width: 300, height: 200 }}
                              />
                              <h6 className="pt-2 font-weight-bold">{item?.title}</h6>
                              <p className="text-secondary">{item?.description}</p>
                              <CButton
                                color="danger"
                                className="text-white"
                                disabled={isDeleting.loading && isDeleting.index === index}
                                onClick={() => deleteBanner(item, index)}
                              >
                                {isDeleting.loading && isDeleting.index === index
                                  ? 'WAITING...'
                                  : 'DELETE'}
                              </CButton>
                            </CCardBody>
                          </CCard>
                        </CCardGroup>
                      </CCol>
                    ))}
                  </>
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CContainer>
  )
}

const AddImagesLayout = () => {
  const [isShowAddImages, setIsShowAddImages] = useState(false)
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddLoading, setIsAddLoading] = useState(false)
  const [apiError, setAPIError] = useState('')
  const nav = useNavigate()

  const validateForm = () => {
    if (!image && !title && !description) {
      setError('All fields are required!')
      return false
    }

    if (!image) {
      setError('image is required')
      return false
    }

    if (!title) {
      setError('title is required')
      return false
    }

    if (!description) {
      setError('description is required')
      return false
    }

    setError('') // Clear errors if validation passes
    return true
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsAddLoading(true)
      const formData = new FormData()
      formData.append('Banner', image) // Ensure key matches backend
      formData.append('title', title)
      formData.append('description', description)

      await axios
        .post(`${API_END_POINT}/admin/AddBanner`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file upload
          },
        })
        .then((res) => {
          getAllBanners()
          setIsShowAddImages(false)
          setIsAddLoading(false);
          setTitle('')
          setImage('')
          setDescription('')
        })
        .catch((err) => {
          setError('Failed to add banner')
          setIsAddLoading(false)
        })
    } catch (err) {
      setIsAddLoading(false)
      setError('Failed to add banner')
    } finally {
      setIsAddLoading(false)
    }
  }

  const getAllBanners = async () => {
    try {
      const response = await axios.get(`${API_END_POINT}/user/getAllBanners`)
      setUsers(response?.data ? response?.data?.data : [])
    } catch (err) {
      setAPIError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllBanners()
  }, [])

  return (
    <div>
      <Outlet />
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CContainer>
            <CRow className="justify-content-center">
              {/* First Card */}
              {allUsersSection({ data: users, loading, setIsShowAddImages, getAllBanners })}

              {/* Second Card */}
              <CModal visible={isShowAddImages} onClose={() => setIsShowAddImages(false)}>
                <CModalHeader closeButton>
                  <CModalTitle>Add Images</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CForm onSubmit={(e) => onSubmitHandler(e)}>
                    <p className="text-body-secondary">Please fill this form</p>

                    {/* Show error message if validation fails */}
                    {error && <CustomAlert type="danger" message={error} />}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilImage} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Select image"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files.length > 0) {
                            setImage(e.target.files[0]) // Store the file object
                            setError('')
                          }
                        }}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilText} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value)
                          setError('')
                        }}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilDescription} />
                      </CInputGroupText>
                      <CFormTextarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value)
                          setError('')
                        }}
                      />
                    </CInputGroup>
                  </CForm>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="success text-light"
                    type="submit"
                    disabled={isAddLoading}
                    onClick={(e) => onSubmitHandler(e)}
                  >
                    {isAddLoading ? 'Waiting...' : 'ADD'}
                  </CButton>
                  <CButton color="secondary" onClick={() => setIsShowAddImages(false)}>
                    CLOSE
                  </CButton>
                </CModalFooter>
              </CModal>
            </CRow>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default AddImagesLayout
