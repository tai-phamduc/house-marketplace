import React from 'react'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { serverTimestamp } from 'firebase/database'
import { db } from '../firebase.config'
import { useNavigate, useParams } from 'react-router-dom'

const EditListing = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    bathrooms: 1,
    bedrooms: 1,
    discountedPrice: 0,
    furnished: false,
    geolocation: {
      lat: 0,
      lng: 0
    },
    images: null,
    location: "",
    name: "",
    offer: false,
    parking: false,
    regularPrice: 0,
    timestamp: null,
    type: "rent",
    userRef: null
  })
  const [loading, setLoading] = useState(true)
  const { bathrooms, bedrooms, discountedPrice, furnished, geolocation, images, location, name, offer, parking, regularPrice, timestamp, type, userRef } = formData
  const auth = getAuth()
  const storage = getStorage()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        async function getData() {
          const currentUserId = user.uid
          const listing = await getListingById(params.id)
          if (currentUserId !== listing.userRef) {
            navigate("/")
          }
          console.log(listing)
          setFormData(listing)
          setLoading(false)
        }
        getData()
      } else {
        toast.error("There is no current user")
      }
    })
  }, [])

  async function getListingById(listingId) {
    const docRef = doc(db, "listings", listingId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return {
        ...(docSnap.data()),
        id: docSnap.id
      }
    } else {
      return null
    }
  }

  function handleTypeChange(e) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.dataset.value
      }
    })
  }
  function handleBooleanChange (e) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: JSON.parse(e.target.dataset.value)
      }
    })
  }
  function handleTextChange(e) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }
  function handleNumberChange(e) {
    setFormData(prevFormData => {
      if (isNaN(+e.target.value)) {
        return prevFormData
      }
      return {
        ...prevFormData,
        [e.target.name]: +e.target.value
      }
    })
  }
  function handleLocationChange(e) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        geolocation: {
          ...(prevFormData.geolocation),
          [e.target.name]: e.target.value
        }
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const submittedFormData = {
      ...formData,
      geolocation: {
        lat: parseFloat(formData.geolocation.lat),
        lng: parseFloat(formData.geolocation.lng)
      },
      timestamp: serverTimestamp(),
    }
    delete submittedFormData.images
    console.log(submittedFormData)
    // 10.816542, 105.934563
    // const docRef = await addDoc(collection(db, "listings"), submittedFormData);
    await setDoc(doc(db, "listings", params.id), submittedFormData);
    navigate(`/profile`)
  }

  function uploadImage(file, storage) {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          reject(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          }).catch((error) => {
            reject(error);
          });
        }
      );
    });
  }

  async function uploadImages(files, storage) {
    const uploadPromises = Array.from(files).map(file => uploadImage(file, storage));
    
    return Promise.all(uploadPromises)
      .then(downloadURLs => {
        return downloadURLs
      })
      .catch(error => {
        throw error
      });
  }

  if (loading == true) {
    return <Spinner/>
  }
  return (
    <main className='py-4'>
      <div className="container">
        <h2 className="display-3 fw-bold mb-4">Edit Listing</h2>
        <form onSubmit={handleSubmit} className='vstack gap-3'>
          <div>
            <label className='mb-2 fw-bold'>Sell/Rent</label>
            <div className='d-flex gap-1'>
              <button type="button" className={`btn btn-light ${type=="sell" && "selected"}`} name="type" data-value='sell' onClick={handleTypeChange}>Sell</button>
              <button type="button" className={`btn btn-light ${type=="rent" && "selected"}`} name="type" data-value='rent' onClick={handleTypeChange}>Rent</button>
            </div>
          </div>
          <div>
            <label className='mb-2 fw-bold'>Name</label>
            <input type="text" className='form-control' name="name" value={name} onChange={handleTextChange}/>
          </div>
          <div className='d-flex gap-3'>
            <div className="d-flex flex-column gap-1">
              <label>Bedrooms</label>
              <input type="number" name="bedrooms" id="bedrooms" className='form-control' min={1} max={50} value={bedrooms} onChange={handleNumberChange} />
            </div>
            <div className="d-flex flex-column gap-1">
              <label>Bathrooms</label>
              <input type="number" name="bathrooms" id="bathrooms" className='form-control' min={1} max={50} value={bathrooms} onChange={handleNumberChange}/>
            </div>
          </div>
          <div>
            <label className='mb-2 fw-bold'>Parking spot</label>
            <div className='d-flex gap-1'>
              <button type="button" className={`btn btn-light ${parking && "selected"}`} name="parking" data-value={true} onClick={handleBooleanChange}>Yes</button>
              <button type="button" className={`btn btn-light ${!parking && "selected"}`} name='parking' data-value={false} onClick={handleBooleanChange}>No</button>
            </div>
          </div>
          <div>
            <label className='mb-2 fw-bold'>Furnished</label>
            <div className='d-flex gap-1'>
              <button type="button" className={`btn btn-light ${furnished && "selected"}`} name="furnished" data-value={true} onClick={handleBooleanChange}>Yes</button>
              <button type="button" className={`btn btn-light ${!furnished && "selected"}`} name="furnished" data-value={false} onClick={handleBooleanChange}>No</button>
            </div>
          </div>
          <div>
            <label className='mb-2 fw-bold'>Address</label>
            <textarea className='form-control' name="location" onChange={handleTextChange} value={location}></textarea>
          </div>
          <div className='d-flex gap-3'>
            <div className="d-flex flex-column gap-1">
              <label className='fw-bold'>Longitude</label>
              <input type="text" name="lng" id="lng" className='form-control' value={geolocation.lng} onChange={handleLocationChange} />
            </div>
            <div className="d-flex flex-column gap-1">
              <label className='fw-bold'>Latitude</label>
              <input type="text" name="lat" id="lat" className='form-control' value={geolocation.lat} onChange={handleLocationChange} />
            </div>
          </div>
          <div>
            <label className='mb-2 fw-bold'>Offer</label>
            <div className='d-flex gap-1'>
              <button type="button" className={`btn btn-light ${offer && "selected"}`} name="offer" data-value={true} onClick={handleBooleanChange}>Yes</button>
              <button type="button" className={`btn btn-light ${!offer && "selected"}`} name="offer" data-value={false} onClick={handleBooleanChange}>No</button>
            </div>
          </div>
          <div>
            <label className='mb-2 fw-bold'>Regular Price</label>
            <input type="text" className='form-control' name='regularPrice' onChange={handleNumberChange} value={regularPrice} />
          </div>
          {offer && (
            <div>
              <label className='mb-2 fw-bold'>Discounted Price</label>
              <input type="text" className='form-control' name='discountedPrice' onChange={handleNumberChange} value={discountedPrice} />
            </div>
          )}
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-primary">Edit Listing</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default EditListing