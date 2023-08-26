import Link from 'next/link'
export default function Header () {

    return (
        <header>
            <nav>|
                <Link href='/'>*</Link>|
                <Link href='/about'> About </Link>|
                <Link href='/login'> Login </Link>|
                <Link href='/signup'> Signup </Link>|
                <Link href='/logout'> Logout </Link>|
                <Link href='/dashboard'> Dashboard </Link>|
            </nav>
        </header>
    )
}