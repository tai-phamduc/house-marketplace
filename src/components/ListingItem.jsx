import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ListingItem = ({ listing, handleDelete=null }) => {
  const navigate = useNavigate()
  function onEdit(e) {
    e.preventDefault()
    navigate(`/listings/${listing.id}/edit`)
  }
  function onDelete(e) {
    e.preventDefault()
    const choice = window.confirm("Are you sure you want to delete this listing")
    if (choice) {
      handleDelete(listing)
    }
  }
  return (
    <Link to={`/listings/${listing.id}`} className='text-decoration-none text-black'>
      <div className='row py-3'>
        <div className="col-4">
          <div className="d-flex flex-column justify-content-center h-100">
            <img src={listing.imgUrls[0]} className='img-fluid rounded-3' alt="" />
          </div>
        </div>
        <div className="col-8">
          <div className="d-flex flex-column">
            <div>{listing.location}</div>
            <h4 className='fs-3'>{listing.name}</h4>
            <div className='text-primary fs-3 fw-bold mb-1'>${listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {listing.type=="rent" ? "/ Month" : ""}</div>
            {handleDelete && (
              <div className="d-flex gap-2 mb-2">
                <EditIcon className='cursor-pointer' color="var(--bs-danger)" onClick={onEdit}/>
                <DeleteIcon className='cursor-pointer' color="var(--bs-danger)" onClick={onDelete}/>
              </div>
            )}
            <div className='d-flex gap-4'>
              <div className="d-flex gap-2 align-items-center">
                <BedIcon/>
                <div>{listing.bedrooms} Bedrooms</div>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <BathtubIcon/>
                <div>{listing.bathrooms} Bathrooms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const BedIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g><rect fill="none" height="3" width="5" x="6" y="7"/><rect fill="none" height="3" width="5" x="13" y="7"/><path d="M20,10V7c0-1.1-0.9-2-2-2H6C4.9,5,4,5.9,4,7v3c-1.1,0-2,0.9-2,2v5h1.33L4,19h1l0.67-2h12.67L19,19h1l0.67-2H22v-5 C22,10.9,21.1,10,20,10z M11,10H6V7h5V10z M18,10h-5V7h5V10z"/></g></g></svg>
  )
}

const BathtubIcon = ({className, onClick}) => {
  return (
    <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g><g><circle cx="7" cy="7" r="2"/></g><g><path d="M20,13V4.83C20,3.27,18.73,2,17.17,2c-0.75,0-1.47,0.3-2,0.83l-1.25,1.25C13.76,4.03,13.59,4,13.41,4 c-0.4,0-0.77,0.12-1.08,0.32l2.76,2.76c0.2-0.31,0.32-0.68,0.32-1.08c0-0.18-0.03-0.34-0.07-0.51l1.25-1.25 C16.74,4.09,16.95,4,17.17,4C17.63,4,18,4.37,18,4.83V13h-6.85c-0.3-0.21-0.57-0.45-0.82-0.72l-1.4-1.55 c-0.19-0.21-0.43-0.38-0.69-0.5C7.93,10.08,7.59,10,7.24,10C6,10.01,5,11.01,5,12.25V13H2v6c0,1.1,0.9,2,2,2c0,0.55,0.45,1,1,1 h14c0.55,0,1-0.45,1-1c1.1,0,2-0.9,2-2v-6H20z"/></g></g></g></svg>
  )
}

const DeleteIcon = ({className, onClick, color}) => {
  return (
    <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={color}><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
  )
}

const EditIcon = ({className, onClick, color}) => {
  return (
    <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={color}><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
  )
}

export default ListingItem