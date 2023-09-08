import { useState, useEffect, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import AuthContext from './context/AuthContext'
import { AuthProvider } from './context/AuthContext'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import FeaturedPets from './pages/FeaturedPets'
import FeaturedOwners from './pages/FeaturedOwners'
import Pound from './pages/Pound'
import Logout from './pages/Logout'
import CreateProfile from './pages/CreateProfile'

import Header from './components/Header'
import Footer from './components/Footer'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './styles/App.css'

function App() {
  const navigate = useNavigate()
  const {auth} = useContext(AuthContext)
  const [userId, setUserId] = useState(null)

  function authorizeUser() {
    fetch('/api/authorize_session')
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((data) => {
          setAuth(data)
        })
      } else {
        setAuth(null)
        console.log(auth)
      }
    })
  }
  useEffect(() => {
    authorizeUser()
  }, [userId])


  useEffect(() => {
    authorizeUser()
  }, [user])
  console.log(user)

  const [count, setCount] = useState(0)

  // useEffect(() => {
  //   fetch('/owners')
  //   .then(r => r.json())
  //   .then(console.log)

  // }, [])
  const [owners, setOwners] = useState([])
  const [pets, setPets] = useState([])
  const [adoptions, setAdoptions] = useState([])

  const [adoptables, setAdoptables] = useState([])
  const [adopted, setAdopted] = useState([])


  useEffect(() => {
      fetchOwners()
      fetchPets()
      fetchAdoptables()
      fetchAdoptions()
  },[])

  function fetchOwners() {
      fetch('/api/owners')
      .then(res => res.json())
      .then(owners => setOwners(owners))
  }
  function fetchPets() {
    fetch('/api/pets')
    .then(res => res.json())
    .then(pets => setPets(pets))
  }
  function fetchAdoptables() {
    fetch('/api/pound')
    .then(res => res.json())
    .then(adoptables => setAdoptables(adoptables))
  }
  function fetchAdoptions() {
    fetch('/api/adoptions')
   .then(res => res.json())
   .then(adoptions => setAdoptions(adoptions))
  }


  return (
      <AuthProvider >
        <Header navigate={navigate}/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create_profile" element={<CreateProfile />} />
          <Route path="/dashboard" element={<Dashboard userId={userId} adoptions={adoptions}/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile navigate={navigate} />} />
          <Route path="/featured_owners" element={<FeaturedOwners owners={owners} />} />
          <Route path="/featured_pets" element={<FeaturedPets pets={pets} />} />
          <Route path="/pound" element={<Pound pets={adoptables}/>} />
        </Routes>
        <Footer />
      </AuthProvider>
  )
}

export default App
