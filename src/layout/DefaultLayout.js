/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import Img from '../assets/images/avatars/2.jpg'
import CIcon from '@coreui/icons-react'
import { cilChevronCircleRightAlt, cilLocationPin } from '@coreui/icons'
import axios from 'axios'
import Spinner from '../components/Spinner'

const allUsers = [
  { id: 1, username: 'John Wick', userImg: Img, desc: 'lorem ipsum test hering derg' },
  { id: 2, username: 'John Wick', userImg: Img, desc: 'lorem ipsum test hering derg' },
  { id: 3, username: 'John Wick', userImg: Img, desc: 'lorem ipsum test hering derg' },
  { id: 4, username: 'John Wick', userImg: Img, desc: 'lorem ipsum test hering derg' },
  { id: 5, username: 'John Wick', userImg: Img, desc: 'lorem ipsum test hering derg' },
  { id: 5, username: 'John Wick', userImg: Img, desc: 'lorem ipsum test hering derg' },
  { id: 5, username: 'John Wick', userImg: Img, desc: 'lorem ipsum test hering derg' },
  { id: 5, username: 'John Wick', userImg: Img, desc: 'lorem ipsum test hering derg' },
  { id: 5, username: 'John Wick', userImg: Img, desc: 'lorem ipsum test hering derg' },
]

const allListings = [
  { id: 1, title: 'Wings Tower', cardImg: Img, location: 'Jackat, Indonesia', price: '$ 300,000' },
  { id: 1, title: 'Wings Tower', cardImg: Img, location: 'Jackat, Indonesia', price: '$ 300,000' },
  { id: 1, title: 'Wings Tower', cardImg: Img, location: 'Jackat, Indonesia', price: '$ 300,000' },
  { id: 1, title: 'Wings Tower', cardImg: Img, location: 'Jackat, Indonesia', price: '$ 300,000' },
  { id: 1, title: 'Wings Tower', cardImg: Img, location: 'Jackat, Indonesia', price: '$ 300,000' },
  { id: 1, title: 'Wings Tower', cardImg: Img, location: 'Jackat, Indonesia', price: '$ 300,000' },
  { id: 1, title: 'Wings Tower', cardImg: Img, location: 'Jackat, Indonesia', price: '$ 300,000' },
  { id: 1, title: 'Wings Tower', cardImg: Img, location: 'Jackat, Indonesia', price: '$ 300,000' },
]

export const API_END_POINT = 'https://appsdemo.pro/AgentsPay/api'

const allUsersSection = ({ data, loading }) => {
  const nav = useNavigate()
  const heading = 'All Users'
  const dataRes = data?.length > 4 ? data?.slice(0, 5) : data

  return (
    <CContainer>
      <CCol md={12}>
        <CCardGroup>
          <CCard className="">
            <CCardBody className="">
              <h3>All Users</h3>
              <CRow>
                {loading ? (
                  <Spinner />
                ) : !dataRes?.length ? (
                  <CCol md={12} className="text-center mt-4">
                    <h5 className="text-secondary">No data available</h5>
                  </CCol>
                ) : (
                  dataRes?.map((item, index) => (
                    <CCol key={index} md={2} className="d-flex items-center m-1">
                      <CCardGroup>
                        <CCard>
                          <CCardBody className="d-flex flex-column items-center">
                            <img
                              src={`https://appsdemo.pro/AgentsPay/${item?.profileImage}`}
                              className="rounded"
                              style={{ width: 170, height: 170 }}
                            />
                            <h6 className="pt-2 font-weight-bold">{item?.full_name}</h6>
                            <div className="d-flex align-items-center flex-row">
                              <CIcon icon={cilLocationPin} />
                              <p className="text-secondary mb-0 p-1">
                                {item?.currentLocation?.address}
                              </p>
                            </div>
                            {/* <p className="text-secondary">{item.desc}</p> */}
                          </CCardBody>
                        </CCard>
                      </CCardGroup>
                      {index === dataRes.length - 1 && dataRes?.length >= 5 && (
                        <CCardGroup
                          className="m-4 mt-0 mb-0"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            const queryString = encodeURIComponent(JSON.stringify(data));
                            nav(`/all/${heading}?data=${queryString}`)
                          }}
                        >
                          <CCard>
                            <CCardBody
                              style={{
                                width: 130,
                                backgroundColor: 'lightgray',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <CIcon icon={cilChevronCircleRightAlt} size="3xl" />
                            </CCardBody>
                          </CCard>
                        </CCardGroup>
                      )}
                    </CCol>
                  ))
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CContainer>
  )
}

const allListingsSection = ({ heading }) => {
  const nav = useNavigate()
  const [listingsData, setListingsData] = useState([])
  const [loading, setLoading] = useState(true)
  const dataRes = listingsData?.length > 4 ? listingsData?.slice(0, 5) : listingsData

  const getAllListings = async ({ heading }) => {
    const category = heading === 'All listings' ? 'All' : heading
    try {
      const response = await axios.get(
        `${API_END_POINT}/listing/listingByCategory?category=${category}`,
      )
      setListingsData(response?.data ? response?.data?.data : [])
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllListings({ heading: heading })
  }, [heading])

  return (
    <CContainer className="pt-4">
      <CCol md={12}>
        <CCardGroup>
          <CCard className="">
            <CCardBody className="">
              <h3>{heading}</h3>
              <CRow>
                {loading ? (
                  <Spinner />
                ) : !dataRes?.length ? (
                  <CCol md={12} className="text-center mt-4">
                    <h5 className="text-secondary">No data available</h5>
                  </CCol>
                ) : (
                  dataRes?.map((item, index) => (
                    <CCol key={index} md={2} className="d-flex items-center m-1">
                      <CCardGroup>
                        <CCard>
                          <CCardBody className="d-flex flex-column items-center">
                            <div
                              style={{
                                backgroundImage: `url(https://appsdemo.pro/AgentsPay/${item.images[0]})`,
                                width: 170,
                                height: 170,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                              className="rounded"
                            >
                              <div className="d-flex justify-content-center align-items-center rounded m-2 flex-row bg-success p-2">
                                <p className="text-white mb-0 small">${item.sellPrice}</p>
                                {/* <p className="text-white mb-0 mt-2 small" style={{ fontSize: 8 }}>
                                  /32%
                                </p> */}
                              </div>
                            </div>
                            <h6 className="pt-2 font-weight-bold">{item.name}</h6>
                            <div className="d-flex align-items-center flex-row">
                              <CIcon icon={cilLocationPin} />
                              <p className="text-secondary mb-0 p-1">{item.cityName}</p>
                            </div>
                          </CCardBody>
                        </CCard>
                      </CCardGroup>
                      {index === dataRes?.length - 1 && dataRes?.length >= 5 && (
                        <CCardGroup
                          className="m-4 mt-0 mb-0"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            const queryString = encodeURIComponent(JSON.stringify(listingsData));
                            nav(`/all/${heading}?data=${queryString}`)
                          }}
                        >
                          <CCard>
                            <CCardBody
                              style={{
                                width: 130,
                                backgroundColor: 'lightgray',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <CIcon icon={cilChevronCircleRightAlt} size="3xl" />
                            </CCardBody>
                          </CCard>
                        </CCardGroup>
                      )}
                    </CCol>
                  ))
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CContainer>
  )
}

const DefaultLayout = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API_END_POINT}/user/AllUsers`)
      setUsers(response?.data ? response?.data?.data : [])
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div>
      <Outlet />
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1 mb-4">
          {/* <AppContent /> */}
          {allUsersSection({ data: users, loading })}
          {allListingsSection({ heading: 'All listings' })}
          {allListingsSection({ heading: 'House' })}
          {allListingsSection({ heading: 'Apartment' })}
          {allListingsSection({ heading: 'Hotel' })}
          {allListingsSection({ heading: 'Villa' })}
          {allListingsSection({ heading: 'Cottage' })}
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
