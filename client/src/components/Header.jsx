import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import {Navbar, Nav, NavDropdown } from'react-bootstrap'
import { LinkContainer } from'react-router-bootstrap'

function NavigationBar () {
    return (
        <Navbar>
            <LinkContainer to='/'>
                <Navbar.Brand>Xeo Petz</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    {/* <LinkContainer to='/'><Nav.Link>Home</Nav.Link></LinkContainer> */}
                    <LinkContainer to='/about'><Nav.Link>About</Nav.Link></LinkContainer>
                    <LinkContainer to='/dashboard'><Nav.Link>Dashboard</Nav.Link></LinkContainer>
                    <LinkContainer to='profile'><Nav.Link>Profile</Nav.Link></LinkContainer>
                    <NavDropdown title='auth' id='basic-nav-dropdown'>
                        <LinkContainer to='/login'><NavDropdown.Item>Login</NavDropdown.Item></LinkContainer>
                        <LinkContainer to='signup'><NavDropdown.Item>Signup</NavDropdown.Item></LinkContainer>
                        <LinkContainer to='/logout'><NavDropdown.Item>Logout</NavDropdown.Item></LinkContainer>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>


    )
}
export default function Header ( {navigate} ) {
    const home = <NavLink to="/">Home</NavLink>
    const about = <NavLink to="/about">About</NavLink>
    const login = <NavLink to="/login">Login</NavLink>
    const register = <NavLink to="/signup">Signup</NavLink>
    const logout = <NavLink to="/logout">Logout</NavLink>
    return (
        <header>
            <nav>Header
                <NavigationBar />
            </nav>
        </header>
    )
}