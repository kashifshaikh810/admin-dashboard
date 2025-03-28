import React from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { AppFooter, AppHeader, AppSidebar } from '../components'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import Img from '../assets/images/avatars/2.jpg'
import CIcon from '@coreui/icons-react'
import { cilLocationPin } from '@coreui/icons'

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

const allUsersSection = () => {
  const { name } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const data = JSON.parse(decodeURIComponent(queryParams.get('data')))

  const renderCardData = () => {
    if (name === 'All Users') {
      return (
        <>
          {data?.map((item, index) => (
            <CCol key={index} md={2} className="d-flex items-center m-2">
              <CCardGroup>
                <CCard>
                  <CCardBody className="d-flex flex-column items-center">
                    <img
                      src={`https://appsdemo.pro/AgentsPay/${item?.profileImage}`}
                      className="rounded"
                      style={{ width: 170, height: 170 }}
                    />
                    <h6 className="pt-2 font-weight-bold">{item.full_name}</h6>
                    <div className="d-flex align-items-center flex-row">
                      <CIcon icon={cilLocationPin} />
                      <p className="text-secondary mb-0 p-1">{item?.currentLocation?.address}</p>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          ))}
        </>
      )
    } else {
      return (
        <>
          {data?.map((item, index) => (
            <CCol key={index} md={2} className="d-flex items-center m-2">
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
            </CCol>
          ))}
        </>
      )
    }
  }

  return (
    <CContainer>
      <CCol md={12}>
        <CCardGroup>
          <CCard className="">
            <CCardBody className="">
              <h3>{name}</h3>
              <CRow>{renderCardData()}</CRow>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CContainer>
  )
}

const ShowAllDataLayout = () => {
  return (
    <div>
      <Outlet />
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1 mb-4">
          {/* <AppContent /> */}
          {allUsersSection()}
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default ShowAllDataLayout
