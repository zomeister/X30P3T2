import Link from 'next/link'
export default function Footer () {
    return(
        <footer>
            <small><em>footer: </em></small>
            <small><Link href='/'>HomePage</Link> </small>
            <small><em>creator</em>: Zed G</small>
        </footer>
    )
}