import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../UserAuth/LoginPage'
import Reg from '../UserAuth/Reg'
import ForgotPassword from '../UserAuth/ForgotPassword'
import ResetPassword from '../UserAuth/ResetPassword'
import ConfirmPasswordReset from '../UserAuth/ConfirmPasswordReset'
import ChangePassword from '../UserAuth/ChangePassword'

const AllRouting = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/signup' element={<Reg/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/resetpassword' element={<ResetPassword/>}/>
            <Route path='/confirmpasswordreset' element={<ConfirmPasswordReset/>}/>
            <Route path='/changepassword' element={<ChangePassword/>}/>
        </Routes>
    </div>
  )
}

export default AllRouting