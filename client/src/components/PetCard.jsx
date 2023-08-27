function PetTitle ({name}){
    const {pet_name} = name
    return (
        <h1>{pet_name}</h1>
    )
}
function PetDescription ({description}){
    const {species} = description
    return (
        <p>{species}</p>
    )
}
export default function PetCard ({ pet }) {
    const { name, description } = pet
    return (
        <div>
            <h1>Pet Card</h1>
            <PetTitle name={name} />
            <PetDescription description={description} />
        </div>
    )
}