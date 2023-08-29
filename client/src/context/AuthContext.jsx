import { createContext, useState } from'react'
const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const login = (values) => {
        fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }).then(response => {})
        .catch(error => {})
    }
    const logout = (values) => {
        fetch('/api/logout', {
            method: 'POST',
        }).then(response => {

        })
       .catch(error => {
        
       })
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext