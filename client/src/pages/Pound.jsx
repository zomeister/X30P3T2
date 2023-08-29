import { useContext, useState, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import PetContainer from "../components/PetContainer"

export default function Pound ({pets}) {
    const { user, setUser } = useContext(AuthContext)

      return (<><PetContainer pets={pets} onDash={false} adoptable={true} /></>)

}