import PetCard from "./PetCard"
export default function PetContainer ({pets}) {
    return (
        <div>
            {pets.map(pet => <PetCard key={pet.id} pet={pet} />)}
        </div>
    )
}