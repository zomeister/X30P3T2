import { NavLink } from 'react-router-dom'
export default function Header ( {navigate} ) {
    const home = <NavLink to="/">Home</NavLink>
    const about = <NavLink to="/about">About</NavLink>
    const login = <NavLink to="/login">Login</NavLink>
    const register = <NavLink to="/register">Register</NavLink>
    const logout = <NavLink to="/logout">Logout</NavLink>
    return (
        <header>
            <nav>Header
                {home}
                {about}
                {login}
                {register}
                {logout}
            </nav>
        </header>
    )
}