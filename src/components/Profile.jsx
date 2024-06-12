import React, { useEffect, useState, useRef } from 'react'
import { getAuth, updateProfile, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import ListingItem from './ListingItem'

// redirect to sign-in page if there is no current user

const Profile = () => {
  const [formData, setFormData] = useState(null)
  const [userListings, setUserListings] = useState(null)  
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const nameInputRef = useRef()
  const navigate = useNavigate()
  const auth = getAuth()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFormData({
          name: user.displayName,
          email: user.email
        });
        const userListings = await getListingOfUser(user.uid)
        console.log(userListings)
        setUserListings(userListings)
        setLoading(false)
      } else {
        setFormData(null);
        navigate("/sign-in")
      }
    });

    return () => unsubscribe();
  }, [auth]);
  useEffect(() => {
    if (editMode) {
      nameInputRef.current.focus();
    }
  }, [editMode])
  async function getListingOfUser(userId) {
    const listingsRef = collection(db, "listings")
    const q = query(listingsRef, where("userRef", "==", userId))
    const querySnapshot = await getDocs(q)
    const listings = []
    querySnapshot.forEach(doc => {
      listings.push({...(doc.data()), id: doc.id})
    })
    return listings
  }
  const logout = () => {
    auth.signOut()
    navigate("/")
  }
  const handleDone = async () => {
    setLoading(true)
    try {
      await updateProfile(auth.currentUser, {displayName: formData.name})
      await updateDoc(doc(db, "users", auth.currentUser.uid), {name: formData.name})
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
    setEditMode(false)
  }
  const handleChangeMode = () => {
    setEditMode(true)
  }
  const handleOnChange = (e) => {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }
  function handleSubmit() {
    navigate("/listings/new")
  }
  async function handleDelete(deletedListing) {
    await deleteDoc(doc(db, "listings", deletedListing.id))
    setUserListings(prevUserListings => {
      return prevUserListings.filter(listing => deletedListing.id !== listing.id)
    })
  }
  if (loading) return <Spinner/>
  return (
    <>
      { loading && <Spinner/> }
      <section className='py-4'>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className='display-2 fw-bold'>My Profile</h2>
            <button className="btn btn-primary" onClick={logout}>Logout</button>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="mb-0 fs-3 fw-semibold">Personal details</p>
            {editMode ? <div className="text-success fw-bold px-3 cursor-pointer" onClick={handleDone}>Done</div> : <div className="text-primary fw-bold px-3 cursor-pointer" onClick={handleChangeMode}>Change</div>}
          </div>
          <form className='vstack gap-3 mb-4  '>
            <input ref={nameInputRef} className='form-control' type="text" name="name" id="name" value={formData ? formData.name : "Loading"} disabled={editMode ? false : true} onChange={handleOnChange} />
            <input className='form-control' type="text" name="email" id="email" value={formData ? formData.email : "Loading"} disabled />
          </form>
          <div onClick={handleSubmit} className='d-flex justify-content-between align-items-center py-2 px-3 bg-primary text-white rounded-3 cursor-pointer'>
            <HomeIcon color="white"/>
            <p className="fw-semibold mb-0 fs-6">Create New Listing</p>
            <KeyBoardArrowRightIcon className='keyboard-arrow-right'/>
          </div>  
        </div>
      </section>
      <section className='user-listings py-4'>
        <div className="container">
          <h3 className='display-4 fw-bold'>Listings</h3>
          {(!userListings || userListings.length == 0) && <div>You have no listings</div>}
          {userListings.map(listing => (
            <ListingItem key={listing.id} listing={listing} handleDelete={listing => handleDelete(listing)}/>
          ))}
        </div>
      </section>
    </>
  )
}

const KeyBoardArrowRightIcon = ({className, onClick}) => {
  return (
    <svg onClick={onClick} className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
    </svg>
  )
}

const HomeIcon = ({className, color}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={color}><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
  )
}

export default Profile