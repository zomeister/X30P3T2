import { useContext, useState, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import PetContainer from "../components/PetContainer"
export default function Dashboard ({userId, adoptions}) {
    const authContext = useContext(AuthContext)
    const [mypets, setMyPets] = useState([])
    
    useEffect(() => {
    const user_id = authContext.user.id
    fetch(`/api/owners/${user_id}/pets`)
      .then(res => res.json())
      .then(pets => setMyPets(pets))
    }, [])

    return (
        <div className="dashboard">
            <h1>Welcome!</h1>
            {mypets.length > 0 ? <PetContainer pets={mypets} onDash={true} adoptable={false}/> : 'No pets found, login and visit pound to see your pets!'}
        </div>
    )

}