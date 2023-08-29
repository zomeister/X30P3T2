import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import OwnerForm from "../components/OwnerForm"

export default function CreateProfile () {
    // const { user } = useContext(AuthContext)

    return (<>
        <OwnerForm />
    </>)

}