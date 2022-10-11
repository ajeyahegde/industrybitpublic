import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
// import SplashScreen from 'src/components/SplashScreen'
import axios from 'axios'
import LogIn from 'src/views/Auth/LogIn'

import {
    resetPassword as resetPasswordSubmit,
    confirmPassword,
} from 'src/actions/openapi'

export const REACT_APP_API_URL = window.location.host === 'localhost:3000'

if (!REACT_APP_API_URL) {
    axios.defaults.baseURL = ''
    axios.defaults.withCredentials = true
}

const initialAuthState = {
    isAuthenticated: false,
    isInitialised: false,
    isPasswordReset: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decoded = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000

    return decoded.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INITIALISE': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'RESET': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: false,
                isPasswordReset: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialAuthState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialAuthState)

    const login = async (email, password) => {
        const response = await axios.post('/api/auth/token', {
            username: email,
            password,
        })
        const { tokens } = response.data
        const { IdToken } = tokens

        setSession(IdToken)
        dispatch({
            type: 'LOGIN',
            payload: {
                user: email,
            },
        })
    }

    const setForgottenPassword = async (email, password, code) => {
        const response = await confirmPassword({
            emailAddress: email,
            password,
            confirmationCode: code,
        })
        const { tokens } = response
        const { IdToken } = tokens

        setSession(IdToken)
        dispatch({
            type: 'LOGIN',
            payload: {
                user: email,
            },
        })
        return Promise.resolve()
    }

    const resetPassword = async (email) => {
        await resetPasswordSubmit(email)

        dispatch({
            type: 'RESET',
            payload: {
                user: email,
            },
        })
        return Promise.resolve()
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    const register = async (email, name, password) => {
        const response = await axios.post('/api/account/register', {
            email,
            name,
            password,
        })
        const { IdToken, user } = response.data

        window.localStorage.setItem('accessToken', IdToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    useEffect(() => {
        const initialise = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const userId = jwtDecode(accessToken).userId

                    const response = await axios.get(`/api/users/${userId}`)
                    const currentUser = response.data

                    dispatch({
                        type: 'INITIALISE',
                        payload: {
                            isAuthenticated: true,
                            user: currentUser,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INITIALISE',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INITIALISE',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        }

        initialise()
    }, [])

    if (!state.isInitialised) {
        return <LogIn />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
                resetPassword,
                setForgottenPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
