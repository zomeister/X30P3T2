import { Card, Button } from 'react-bootstrap'


export default function PetCard ({ pet }) {
    // const { name, description } = pet
    return (
        <Card>
            <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Subtitle>{pet.species}</Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            {/* <Card.Footer>
                <Button variant='primary'>Edit</Button>
                <Button variant='danger'>Delete</Button>
            </Card.Footer> */}
        </Card>
    )
}