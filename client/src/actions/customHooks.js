import React, { useState, useEffect } from 'react'

import { getOrganization, getCurrentUser } from './openapi'
import { useLocation } from 'react-router-dom'

export function useOrganization() {
    const [organization, setOrganization] = useState({})

    useEffect(() => {
        async function asyncGetOrganization() {
            const result = await getOrganization()
            setOrganization(result)
        }
        asyncGetOrganization()
    }, [])
    return organization
}

export function useUserDetails() {
    const [userDetails, setUserDetails] = useState(-1)

    useEffect(() => {
        async function asyncFetchProfileSettings() {
            const results = await getCurrentUser()
            const { firstName, lastName, emailAddress, role } = results
            setUserDetails({
                firstName,
                lastName,
                emailAddress,
                role,
            })
        }
        asyncFetchProfileSettings()
    }, [])
    return userDetails
}

export function useQuery() {
    return new URLSearchParams(useLocation().search)
}
