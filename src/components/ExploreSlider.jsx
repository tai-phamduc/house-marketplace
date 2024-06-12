import { collection, orderBy, query, limit, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import Spinner from './Spinner'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom'
const ExploreSlider = () => {
  // select 5 latest listings
  const [latestListings, setLastestListings] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function getData() {
      const latestListings = await getLastestListings()
      setLastestListings(latestListings)
      setLoading(false)
    }
    getData()
  }, [])
  async function getLastestListings() {
    const listingsRef = collection(db, "listings")
    const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5))
    const querySnapshot = await getDocs(q)
    const listings = []
    querySnapshot.forEach(doc => {
      listings.push({...(doc.data()), id: doc.id})
    })
    return listings
  }
  // show their first image onto the swiper
  if (loading) return <Spinner/>
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        {latestListings.map(latestListing => (
          <SwiperSlide key={latestListing.id}>
            <Link to={`/listings/${latestListing.id}`}>
              <div className="explore-slider-content" style={{ 
                  background: `url(${latestListing.imgUrls[0]}) center center no-repeat`,
                  backgroundSize: "cover",
                  borderRadius: "0.5rem"
                }}>
                <span style={{position: "absolute", top: "0.25rem", left: "0.25rem"}} className='bg-white text-black px-2 py-1 fw-bold rounded-3'>{latestListing.name}</span>
                <br />
                <span style={{position: "absolute", bottom: "1rem", right: "1rem"}} className='bg-white text-primary px-2 py-1 fw-bold rounded-3'>${latestListing.offer ? latestListing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : latestListing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default ExploreSlider