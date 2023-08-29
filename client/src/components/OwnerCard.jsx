import { Card, Button } from 'react-bootstrap'

export default function OwnerCard ({owner}) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Name: {owner.first_name}, {owner.last_name}</Card.Title>
                <Card.Subtitle>Location (city): {owner.location}</Card.Subtitle>
                <Card.Img src={owner.photo} alt='avatar' />
                <Card.Text>Bio: {owner.bio}</Card.Text>
                <Button variant='primary'>View Profile</Button>
                <Button variant='primary'>Add Friend</Button>
            </Card.Body>
            {/* <Card.Footer>
                <Button variant='primary'>Edit</Button>
                <Button variant='danger'>Delete</Button>
            </Card.Footer> */}
        </Card>
    )
}