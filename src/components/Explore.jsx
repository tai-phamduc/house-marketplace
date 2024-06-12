import React from 'react'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import { Link } from 'react-router-dom'
import ExploreSlider from './ExploreSlider'
const Explore = () => {
  return (
    <main className='py-4'>
      <div className="container">
        <h2 className="display-2 fw-bold mb-4">Explore</h2>
        <div className='mb-4'>
          <h5 className='fw-semibold mb-3'>Recomended</h5>
          <ExploreSlider/>
        </div>
        <div className='row'>
          <h5 className="fw-semibold mb-3">Categories</h5>
          <div className="col-6">
            <Link to="category/rent" className="d-flex flex-column gap-2 text-decoration-none text-black">
              <img src={rentCategoryImage} className='category-image rounded-3' alt="" />
              <p className="mb-0">Places for rent</p>
            </Link>
          </div>
          <div className="col-6">
            <Link to="category/sell" className="d-flex flex-column gap-2 text-decoration-none text-black">
              <img src={sellCategoryImage} className='category-image rounded-3' alt="" />
              <p className="mb-0">Places for sale</p>
            </Link>
          </div>
        </div>
        
      </div>
    </main>
  )
}

export default Explore