import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import Spinner from './Spinner'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Slider from './Slider'


const ListingDetail = () => {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [owner, setOwner] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const listing = await getListingById(id)
        const owner = await getUserById(listing.userRef)
        console.log(listing)
        setListing(listing)
        setOwner(owner)
        setLoading(false)
      } else {
        setCurrentUser(null);
        const listing = await getListingById(id)
        const owner = await getUserById(listing.userRef)
        setListing(listing)
        setOwner(owner)
        setLoading(false)
      }
    });
    return () => unsubscribe();
  }, [])
  
  async function getListingById(id) {
    const docRef = doc(db, "listings", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return null
    }
  }
  async function getUserById(id) {
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return null
    }
  }
  function copyLinkToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(function() {
      toast.success("Copied to clipboard")
    }).catch(function(error) {
      toast.error(error.message)
    });
  }

  if (loading) {
    return <Spinner/>
  }
  return (
    <>
      <Slider imgUrls={listing.imgUrls}/>
      <main className='py-3'>
        <div className="container position-relative">
          <ShareIcon onClick={copyLinkToClipboard} className="share-icon"/>
          <div className="mb-3">
            <h2 className="display-3 fw-bold">{listing.name}</h2>
            <div className='fw-semibold mb-2'>{listing.location}</div>
            <div className="d-flex gap-3 mb-2">
              <div className='badge bg-primary text-white'>For {listing.type}</div>
              {listing.offer && <div className='badge bg-black text-white'>${listing.regularPrice - listing.discountedPrice} discount</div>}
            </div>
            <div className='mb-1'>{listing.bedrooms} bedrooms</div>
            <div className='mb-1'>{listing.bathrooms} bathrooms</div>
            { listing.parking && <div className='mb-1'>Parking Spot</div>}
            { listing.furnished && <div className='mb-1'>Furnished</div>}
            <div>Owner: {owner.name}</div>
          </div>
          <div className='mb-3'>
            <h4 className="fw-semibold">Location</h4>
            {/* Map goes here */}
            <MapContainer className='map-container rounded-3' center={[listing.geolocation.lat, listing.geolocation.lng]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          {currentUser.uid !== listing.userRef && (
            <div className='d-flex justify-content-center'>
              <a href={`/listings/${id}/contact`} className="btn btn-primary fw-bold px-5 text-decoration-none">Contact Landlord</a>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

const ShareIcon = ({className, onClick}) => {
  return (
    <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
      </svg>
  )
}

export default ListingDetail