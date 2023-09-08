import React, {useState } from 'react'
const AuthContext = React.createContext()

export function AuthProvider ( { children } ) {
    const [auth, setAuth] = useState(null)
    
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext