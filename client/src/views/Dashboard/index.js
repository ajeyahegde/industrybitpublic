import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Grid, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

import useAuth from 'src/hooks/useAuth'

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
        // async function asyncFetchProfileSettings() {
        //     const results = await getCurrentUser()
        //     const { firstName, lastName, emailAddress, role } = results
        //     setUserDetails({
        //         firstName,
        //         lastName,
        //         emailAddress,
        //         role,
        //     })
        // }
        // asyncFetchProfileSettings()
    }, [])

    return (
        <Box
            className={clsx(classes.root, className)}
            width="900px"
            {...rest}
        ></Box>
    )
}

General.propTypes = {
    className: PropTypes.string,
}

export default General
