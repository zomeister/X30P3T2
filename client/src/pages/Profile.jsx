import { useContext, useState, useEffect } from "react"
import OwnerCard from "../components/OwnerCard"
import AuthContext from "../context/AuthContext"
import { Card, Button,  } from 'react-bootstrap'
// import { useNavigate } from "react-router-dom"

export default function Profile ({navigate}) {
    const { user, setUser } = useContext(AuthContext)
    const [owner, setOwner] = useState({})
    // const navigate = useNavigate()
    
    function getOwner() {
        if ( user === null ) {
            return null
        } else {
            return user.owner
        }
    }

    function fetchOwner() {
        fetch(`/api/owners/${user.id}`)
        .then(res => res.json())
        .then(data => setOwner(data))
    }
    useEffect(() => {
        fetchOwner()
    }, [])

    return (<>
        <h1> Hello {owner.first_name} {owner.last_name}</h1>
        <Card>
            <Card.Body>
                <Card.Title>Name: {owner.first_name}, {owner.last_name}</Card.Title>
                <Card.Subtitle>Location (city): {owner.location}</Card.Subtitle>
                <Card.Img src={owner.photo} alt='avatar' />
                <Card.Text>Bio: {owner.bio}</Card.Text>
                <Button variant='primary'>Edit Profile</Button>
                {/* <Button variant='primary'>View Pets</Button> */}
            </Card.Body>
            {/* <Card.Footer>
                <Button variant='primary'>Edit</Button>
                <Button variant='danger'>Delete</Button>
            </Card.Footer> */}
        </Card>
    
    </>)
}