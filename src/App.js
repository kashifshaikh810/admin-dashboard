import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom'

import { CSpinner } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'
import AddImagesLayout from './layout/AddImagesLayout'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const ShowAllData = React.lazy(() => import('./layout/ShowAllDataLayout'))

// Pages
const Login = React.lazy(() => import('./layout/login/Login'))

const App = () => {
  const getDataIfUserLoggedIn = () => {
    const savedData = localStorage.getItem('data')
    const resData = savedData ? JSON.parse(savedData) : null
    return resData
  }

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route
            exact
            path="/"
            element={getDataIfUserLoggedIn()?.data?.id ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/dashboard" element={<DefaultLayout />} />
          <Route path="/addImages" element={<AddImagesLayout />} />
          <Route path="/all/:name" element={<ShowAllData />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
