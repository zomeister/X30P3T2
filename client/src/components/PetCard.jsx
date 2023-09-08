import { Card, Button } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'
import {useContext, useState} from'react'

export default function PetCard ({ pet, species, onDash, adoptable }) {
    const authContext = useContext(AuthContext)
    const [adopted, setAdopted] = useState(adoptable)
    const [details, setDetails] = useState(null)

    function adoptPet () {
        const userData = { pet_id : pet.id, owner_id : authContext.user.id }
        fetch(`/api/adoptions`,
            {'method': 'POST',
        'headers': {'content-type': 'application/json'},
        'body': JSON.stringify(userData)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    function getDetails () {
        fetch(`/api/pets/${pet.id}/stats`)
        .then(res => res.json())
        .then(data => {console.log(data)})
    }

    function handleAdoption () {
        setAdopted(prev => !prev)
        adoptPet()
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Subtitle>{pet.species.emoji} {pet.species.name.toUpperCase()} {pet.species.emoji}</Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
                {adopted 
                ? <Button variant="outline-primary" onClick={handleAdoption}>Adopt</Button> 
                : onDash
                    ? <Button variant="primary" onClick={() => getDetails}>Details</Button> 
                    : <Button variant="secondary" onCick={() => getDetails}>View</Button>
                }
            </Card.Body>
        </Card>
    )
}