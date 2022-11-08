import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Box, Typography, Breadcrumbs, Link } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { capitalize } from 'lodash'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: { margin: theme.spacing(3) },
}))

const BreadCrumbs = ({ className, ...rest }) => {
    const classes = useStyles()

    const location = useLocation()
    const locationSubPath = location.pathname.split('/')
    const isBasePath = location.pathname === '/'

    return (
        <Box className={clsx(classes.root, className)} {...rest}>
            {!isBasePath && (
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link color="inherit" to="/" component={RouterLink}>
                        Dashboard
                    </Link>
                    {locationSubPath
                        .filter((key) => !!key)
                        .map((entry, index, array) => {
                            let modifiedIndex = index + 1
                            const isLeafPath = modifiedIndex < array.length
                            return !isLeafPath ? (
                                <Typography color="textPrimary">
                                    {capitalize(entry)}
                                </Typography>
                            ) : (
                                <Link
                                    color="inherit"
                                    to={`/${entry}`}
                                    component={RouterLink}
                                >
                                    {capitalize(entry)}
                                </Link>
                            )
                        })}
                </Breadcrumbs>
            )}
        </Box>
    )
}

BreadCrumbs.propTypes = {
    orderedEndpoints: PropTypes.array,
}

export default BreadCrumbs
