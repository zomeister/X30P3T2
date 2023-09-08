import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import {Navbar, Nav, NavDropdown, Button } from'react-bootstrap'
import { LinkContainer } from'react-router-bootstrap'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'

const Tabs = () => {
    return (
        <Nav>
        <LinkContainer to='/about'><Nav.Link>About</Nav.Link></LinkContainer>
        <LinkContainer to='/dashboard'><Nav.Link>Dashboard</Nav.Link></LinkContainer>
        <LinkContainer to='/pound'><Nav.Link>Pound</Nav.Link></LinkContainer>
        {user == null ? null : <LinkContainer to='profile'><Nav.Link>Profile</Nav.Link></LinkContainer>}
        {user == null 
            ? <>
                <NavDropdown title='auth' id='basic-nav-dropdown'>
                    <LinkContainer to='/login'><NavDropdown.Item>Login</NavDropdown.Item></LinkContainer>
                    <LinkContainer to='/signup'><NavDropdown.Item>Signup</NavDropdown.Item></LinkContainer>
                </NavDropdown>
                </>
            : <Button variant='outline-primary' onClick={logout}>Logout</Button>
        }
    </Nav>
    )
}

export default function Header ( {navigate} ) {
    const {user, setUser} = useContext(AuthContext)

    const [currentTab, setCurrentTab] = useState('home')
    const handleCurrentTab = (tab) => setCurrentTab(tab)

    function logout() {
        fetch('/api/logout', {method: 'POST'})
       .then((res) => {
          if (res.ok) {
            setUser(null)
            navigate('/')
            console.log(user)
          }
       })
      }

    return (
        <header>
        <nav><Navbar fixed='top'>
                <LinkContainer to='/'>
                    <Navbar.Brand>Xeo Petz</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">Tabs
                </Navbar.Collapse>
                <p>{user ? user.username : 'login to view'}</p>
            </Navbar></nav>
        </header>
    )
}