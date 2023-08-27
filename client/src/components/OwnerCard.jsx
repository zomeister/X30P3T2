function OwnerTitle ({first_name, last_name}) {
    return (<h2>Owner Name: {last_name}, {first_name}</h2>)
}
function OwnerDescription ({ description }) {
    const { photo, city, bio } = description
    return (<div>
        <img src={photo} alt='avatar' />
        <p>City: {city}</p>
        <p>Bio: {bio}</p>
    </div>)
}
export default function OwnerCard ({owner}) {
    // const { name, description} = owner
    return (
        <div>
            <h1>Owner Card</h1>
            <OwnerTitle first_name={owner.first_name} last_name={owner.last_name} />
            {/* <OwnerDescription description={description} /> */}
        </div>
    )
}