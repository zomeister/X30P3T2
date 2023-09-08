import PetCard from "./PetCard"
import { useState, useEffect } from 'react'
export default function PetContainer ({pets, onDash=false, adoptable=true}) {
    const [specieses, setSpecieses] = useState([])
    const [displayedPets, setDisplayedPets] = useState([])
    

    function fetchSpecieses () {
        fetch('api/specieses')
        .then(res => res.json())
        .then(data => setSpecieses(data))
    }
    useEffect(() => {
        fetchSpecieses()
    }, [])

    return (
        <div>
            {pets.map(pet => <PetCard key={pet.id} species={specieses[pet.species_id]} pet={pet} onDash={onDash} adoptable={adoptable}/>)}
        </div>
    )
}