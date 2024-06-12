import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, query, where, getDocs, limit, startAfter, orderBy } from "firebase/firestore"
import { db } from '../firebase.config'
import Spinner from './Spinner'
import ListingItem from '../components/ListingItem'

const Offers = () => {
  const params = useParams()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastVisible, setLastVisible] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && lastVisible) { // Check if lastVisible is not null
        async function fetchMoreData() {
          const newQuery = query(
            collection(db, "listings"),
            where("type", "==", params.categoryName),
            orderBy("timestamp", "desc"),
            startAfter(lastVisible),
            limit(10)
          );
          const querySnapshot = await getDocs(newQuery);
          if (!querySnapshot.empty) {
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              setListings((prevListings) => [
                ...prevListings,
                {
                  ...data,
                  id: doc.id,
                },
              ]);
            });
          }
        }
        fetchMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastVisible, params.categoryName]); 

  useEffect(() => {
    const fetchData = async () => {
      const listings = []
      const q = query(collection(db, "listings"), where("offer", "==", true), limit(10))
      const querySnapshot = await getDocs(q)
      setLoading(false)
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        listings.push(
          {
            ...data,
            id: doc.id
          }
        )
      })
      setListings(listings)
    }
    fetchData()
  }, [])
  if (loading) {
    return <Spinner/>
  }
  return (
    <main className='py-4'>
      <div className="container">
        <h2 className="display-3 fw-bold mb-3">Offers</h2>
        <div className="vstack">
          {listings ? listings.map(listing => <ListingItem key={listing.id} listing={listing}>{listing.name}</ListingItem>) : <div>No data</div>}
        </div>
      </div>
    </main>
  )
}

export default Offers