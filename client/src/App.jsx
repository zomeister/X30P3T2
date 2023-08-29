import { useState, useEffect, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// import { AuthContext } from './context/AuthContext'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import FeaturedPets from './pages/FeaturedPets'
import FeaturedOwners from './pages/FeaturedOwners'
import Pound from './pages/Pound'

import Header from './components/Header'
import Footer from './components/Footer'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './styles/App.css'

function App() {
  // const navigate = useNavigate()
  // const [user, setUser] = useContext(null)

  // useEffect(() => {
  //   authorizeUser()
  // }, [user])
  // console.log(user)

  const [count, setCount] = useState(0)

  // useEffect(() => {
  //   fetch('/owners')
  //   .then(r => r.json())
  //   .then(console.log)

  // }, [])
  const [owners, setOwners] = useState([])
  const [pets, setPets] = useState([])

  useEffect(() => {
      fetchOwners()
      fetchPets()
  },[])
  function fetchOwners() {
      fetch('/api/owners')
      .then(res => res.json())
      .then(owners => setOwners(owners))
      console.log(owners)
  }
  function fetchPets() {
    fetch('/api/pets')
    .then(res => res.json())
    .then(pets => setPets(pets))
    console.log(pets)
  }

  return (
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/featured_owners" element={<FeaturedOwners owners={owners} />} />
          <Route path="/featured_pets" element={<FeaturedPets pets={pets} />} />
          <Route path="/pound" element={<Pound />} />
        </Routes>
        <Footer />
      </div>
  )
}

export default App
