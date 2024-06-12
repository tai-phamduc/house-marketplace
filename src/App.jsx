import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Explore from './components/Explore'
import Offers from './components/Offers'
import Profile from './components/Profile'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { app, db } from './firebase.config'
import ForgotPassword from './components/ForgotPassword'
import Category from './components/Category'
import CreateListing from './components/CreateListing'
import ListingDetail from './components/ListingDetail'
import Contact from './components/Contact'
import EditListing from './components/EditListing'
function App() {

  return (
    <>
      <ToastContainer/>
      <Router>
        <div className="pb-8">
          <Routes>
            <Route path='/' element={<Explore/>}></Route>
            <Route path='/offers' element={<Offers/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/sign-in' element={<SignIn/>}></Route>
            <Route path='/sign-up' element={<SignUp/>}></Route>
            <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
            <Route path='/category/:categoryName' element={<Category/>}></Route>
            <Route path='/listings/new' element={<CreateListing/>}></Route>
            <Route path='/listings/:id' element={<ListingDetail/>}></Route>
            <Route path='/listings/:id/contact' element={<Contact/>}></Route>
            <Route path='/listings/:id/edit' element={<EditListing/>}></Route>
          </Routes>
        </div>
        <Navbar/>
      </Router>
    </>
  )
}

export default App
