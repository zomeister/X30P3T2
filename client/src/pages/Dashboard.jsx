import { useContext, useState, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import PetContainer from "../components/PetContainer"
export default function Dashboard ({adoptions}) {
    const userContext = useContext(AuthContext)
    const [mypets, setMyPets] = useState([])
    
    useEffect(() => {
        fetch(`/api/owners/${1}/pets`)
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