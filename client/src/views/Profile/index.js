import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Grid, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { getCurrentUser } from 'src/actions/openapi'
import useAuth from 'src/hooks/useAuth'
import ProfileDetails from './ProfileDetails'
import GeneralSettings from './GeneralSettings'
import Password from './Password'
import OrganizationSetting from './Organization'

const useStyles = makeStyles((theme) => ({
    root: { margin: theme.spacing(3) },
    spacer: { padding: theme.spacing(2) },
}))

const General = ({ className, ...rest }) => {
    const classes = useStyles()
    // const { user } = useAuth()
    const [user, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
    })

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

    return (
        <Box className={clsx(classes.root, className)} width="900px" {...rest}>
            {/* <ProfileDetails user={user} />
            <Box className={classes.spacer} /> */}

            <GeneralSettings user={user} />
            <Box className={classes.spacer} />
            {user.role == 2 && <OrganizationSetting></OrganizationSetting>}
            <Box className={classes.spacer} />
            <Password />
        </Box>
    )
}

General.propTypes = {
    className: PropTypes.string,
}

export default General
