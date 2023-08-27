import { Link } from 'react-router-dom'
export default function Footer (  ) {
    const about = <Link to="/about">About</Link>
    const featured_owners = <Link to="/featured_owners">Featured Owners</Link>
    const featured_pets = <Link to="/featured_pets">Featured Pets</Link>

    return (
        <footer>
            Footer
            <span>
                {about}
                {featured_owners}
                {featured_pets}
            </span>
        </footer>
    )
}