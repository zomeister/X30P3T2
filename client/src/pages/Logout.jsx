import { useContext } from "react"
import AuthContext from "../context/AuthContext"
export default function Logout ()  {
    const { user, setUser } = useContext(AuthContext)
    function logout() {
        fetch('/api/logout', {method: 'POST'})
       .then((res) => {
          if (res.ok) {
            setUser(null)
            navigate('/')
            console.log(user)
          }
       })
      }

    return (<div>Logout<button onClick={logout}>click</button></div>)
}