import OwnerCard from "../components/OwnerCard"
import { useState, useEffect } from "react"
export default function FeaturedOwners ({owners}) {

    return (
        <div>
            <h1>Featured Owners</h1>
            {owners.map(owner => <OwnerCard key={owner.id} owner={owner} />)}
        </div>
    )
}