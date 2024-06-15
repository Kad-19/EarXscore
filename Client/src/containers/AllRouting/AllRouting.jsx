import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../UserAuth/LoginPage'
import Reg from '../UserAuth/Reg'

const AllRouting = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/signup' element={<Reg/>}/>
        </Routes>
    </div>
  )
}

export default AllRouting