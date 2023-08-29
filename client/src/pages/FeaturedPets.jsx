import PetContainer from '../components/PetContainer'
import PetForm from '../components/PetForm'

export default function FeaturedPets ({pets}) {
    console.log(pets)
    return (
        <div>
            <h2>Featured pets</h2>
            <PetContainer pets={pets}/>
            <PetForm />
        </div>
    )
}