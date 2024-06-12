import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import GoogleOAuth from './GoogleOAuth'

const SignIn = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({email: "", password: ""})
  const [passwordVisible, setPasswordVisible] = useState(false)

  const auth = getAuth()

  const handleOnChange = (e) => {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      if (userCredential.user) {
        navigate("/")
      } else {
        toast.error("Email or password is incorrect")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section className='py-3'>
      <div className='container'>
        <h2 className="display-3 fw-bold mb-3">Welcome Back!</h2>
        <form className='vstack gap-3 py-3'>
          <div className='input-group-custom'>
            <PersonIcon className='input-group-img-start'/>
            <input type="text" name='email' className='form-control' placeholder='Email' value={formData.email} onChange={handleOnChange} />
          </div>
          <div className='input-group-custom mb-3'>
            <LockIcon className='input-group-img-start'/>
            <input type={passwordVisible ? "text" : "password"} name='password' className='form-control' placeholder='Password' value={formData.password} onChange={handleOnChange} />
            <VisibilityIcon className='input-group-img-end cursor-pointer' onClick={() => setPasswordVisible(!passwordVisible)}/>
          </div>
          <div className='d-flex justify-content-end mb-3'>
            <Link to="/forgot-password" className='fw-bold text-success text-decoration-none'>Forget Password</Link>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className="display-5 fw-semibold">Sign In</h3>
            <KeyBoardArrowRightIcon onClick={handleSubmit} className='keyboard-arrow-right cursor-pointer'/>
          </div>  
        </form>
        <div className='d-flex flex-column gap-4 justify-content-center align-items-center py-4 mb-3'>
          <div>Sign in with</div>
          <GoogleOAuth/>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/sign-up" className='fw-bold text-success text-decoration-none'>Sign Up Instead</Link>
        </div>
      </div>
    </section>
  )
}

const PersonIcon = ({className}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  )
}

const LockIcon = ({className}) => {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
    <path d="M0 0h24v24H0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
}

const VisibilityIcon = ({className, onClick}) => {
  return (
    <svg onClick={onClick} className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
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

export default SignIn