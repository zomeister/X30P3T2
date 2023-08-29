import OwnerContainer from "../components/OwnerContainer"
import OwnerForm from "../components/OwnerForm"

import { useState, useEffect } from "react"
export default function FeaturedOwners ({owners}) {
    console.log(owners)

    return (
        <div>
            <h2>Featured Owners</h2>
            <OwnerContainer owners={owners}/>
            <OwnerForm />
        </div>
    )
}