import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar shadow-lg py-3'>
      <div className="container">
        <div className="row m-0 w-100">
          <div className="col-4">
            <NavLink to="/" className="nav-link d-flex flex-column gap-2 align-items-center">
              <ExploreIcon className="icon"/>
              <p className="mb-0">Explore</p>
            </NavLink>
          </div>
          <div className="col-4">
            <NavLink to="/offers" className="nav-link d-flex flex-column gap-2 align-items-center">
              <OfferIcon className='icon'/>
              <p className="mb-0">Offers</p>
            </NavLink>
          </div>
          <div className="col-4">
            <NavLink to="/profile" className="nav-link d-flex flex-column gap-2 align-items-center">
              <PersonOutlineIcon className='icon'/>
              <p className="mb-0">Profile</p>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

const ExploreIcon = ({className}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000">
      <path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
    </svg>
  )
}

const OfferIcon = ({className}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000">
      <path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z"/>
      <circle cx="6.5" cy="6.5" r="1.5"/>
    </svg>
  )
}

const PersonOutlineIcon = ({className}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000">
      <path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  )
}

export default Navbar