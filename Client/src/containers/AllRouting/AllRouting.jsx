import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../UserAuth/LoginPage'
import Reg from '../UserAuth/Reg'
import ForgotPassword from '../UserAuth/ForgotPassword'
import ResetPassword from '../UserAuth/ResetPassword'
import ConfirmPasswordReset from '../UserAuth/ConfirmPasswordReset'
import ChangePassword from '../UserAuth/ChangePassword'
import UserDashboard from '../UserDashboard/UserDashboard'
import Quizz from '../Quizes/Quizz'
import Score from '../Quizes/Score'
import About from '../About/About'
import Footer from '../Footer/Footer'

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
            <Route path='/userdashboard' element={<UserDashboard/>}/>
            <Route path='/quizz/:difficulty' element={<Quizz/>}/>
            <Route path='/score/:result' element={<Score/>}/>
            <Route path='/about' element={<About/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default AllRouting