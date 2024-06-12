import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth" 
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [formData, setFormData] = useState({email: ""})
  const auth = getAuth()
  const handleOnChange = e => {
    setFormData({
      ...formData,
      email: e.target.value
    })
  }
  const handleSubmit = e => {
    // check to see if it's even in the database
    sendPasswordResetEmail(auth, formData.email)
    .then(() => {
      toast.success("Check your mail inbox to change your password")
    })
    .catch((error) => {
      toast.error(error.message)
    });
  }
  return (
    <main className='py-4'>
      <div className="container">
        <h2 className='mb-4 display-4 fw-bold'>Forgot Password</h2>
        <form className='mb-3'>
          <div className='input-group-custom'>
            <PersonIcon className='input-group-img-start'/>
            <input type="text" name='email' className='form-control' placeholder='Email' value={formData.email} onChange={handleOnChange} />
          </div>
        </form>
        <div className="d-flex justify-content-end mb-5">
          <Link to="/sign-in" className="text-primary fw-bold text-decoration-none">Sign in</Link>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className="display-5 fw-semibold">Send Reset Link</h3>
          <KeyBoardArrowRightIcon onClick={handleSubmit} className='keyboard-arrow-right cursor-pointer'/>
        </div> 
      </div>
    </main>
  )
}

const PersonIcon = ({className}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  )
}

const KeyBoardArrowRightIcon = ({className, onClick}) => {
  return (
    <svg onClick={onClick} className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
    </svg>
  )
}

export default ForgotPassword