import { useContext } from 'react'
import AuthContext from 'src/context/JWTAuthContext'

const useAuth = () => useContext(AuthContext)

export default useAuth
