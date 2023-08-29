import OwnerCard from './OwnerCard'
export default function OwnerContainer ({owners}) {
    return (
        <div>
            {owners.map(owner => <OwnerCard key={owner.id} owner={owner}/>)}
        </div>
    )
}