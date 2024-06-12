import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import Spinner from './Spinner'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'


const Contact = () => {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [message, setMessage] = useState("")
  const [owner, setOwner] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function getData() {
      const listing = await getListingById(id)
      const owner = await getUserById(listing.userRef)
      setListing(listing)
      setOwner(owner)
      setLoading(false)
    }
    getData()
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

  function handleSendEmail() {
    if (!owner || !listing) {
      toast.error('Owner or listing data not available');
      return;
    }
    const email = owner.email;
    const subject = encodeURIComponent(listing.name);
    const body = encodeURIComponent(message);
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    navigate(`/listings/${id}`)
  };

  
  if (loading) {
    return <Spinner/>
  }
  return (
    <main className='py-3'>
      <div className="container">
        <h2 className="display-2 fw-bold mb-3">Contact Landlord</h2>
        <p className="mb-0 fs-4 fw-semibold mb-3">Contact {owner.name}</p>
        <form onSubmit={(e) => { e.preventDefault(); handleSendEmail(); }}>
          <label htmlFor="message" className='mb-2'>Message</label>
          <textarea className='form-control mb-3' name="message" id="message" rows={10} value={message} onChange={e => {setMessage(e.target.value)}}></textarea>
          <button type="submit" className='btn btn-primary px-4'>Send Message</button>
        </form>
      </div>
    </main>
  )
}

export default Contact