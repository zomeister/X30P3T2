import PetCard from "./PetCard"
export default function PetContainer ({pets, onDash=false, adoptable=true}) {
    return (
        <div>
            {pets.map(pet => <PetCard key={pet.id} pet={pet} onDash={onDash} adoptable={adoptable}/>)}
        </div>
    )
}