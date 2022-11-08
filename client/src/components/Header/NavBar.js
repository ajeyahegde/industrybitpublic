import React, { useEffect, useState } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
import { capitalize } from 'lodash'
import {
    Box,
    Button,
    Collapse,
    Divider,
    Drawer,
    Hidden,
    List,
    ListItem,
    ListSubheader,
    Typography,
    Paper,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import NavItem from './NavItem'
import { useOrganization } from 'src/actions/customHooks'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import IconButton from '@mui/material/IconButton'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import GridViewIcon from '@mui/icons-material/GridView'

const sections = [
    {
        title: 'Dashboard',
        icon: DashboardIcon,
        href: '/',
    },
    {
        title: 'Zones',
        icon: GridViewIcon,
        href: '/zones',
    },
    {
        title: 'Analytics',
        icon: EqualizerIcon,
        href: '/analytics',
        disabled: true,
    },
]

const borderMap = {
    RTaaS: '#7B0000',
    MDR: '#00007b',
}

const useStyles = makeStyles((theme) => ({
    mobileDrawer: {
        width: 256,
    },
    desktopDrawer: {
        paddingTop: 68,
        minWidth: '150px',
        width: '15%',
        maxWidth: '200px',
        height: 'calc(100vh - 72px)',
    },
    companyLogo: {
        cursor: 'pointer',
        width: 80,
        height: 80,
    },
    item: {
        display: 'block',
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        color: theme.palette.text.secondary,
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
    },
    companyContainer: {
        margin: '0 auto',
        width: '50%',
        textAlign: 'center',
    },
    companyName: {
        color: theme.palette.text.primary,
    },
    companyPackage: {
        color: theme.palette.text.secondary,
    },
    headerButton: {
        height: '120px',
        width: '120px',
    },
    chevronButton: {
        position: 'absolute',
        right: '-5px',
    },
}))

const NavBar = ({ onMobileClose, openMobile }) => {
    const classes = useStyles()
    const location = useLocation()

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <Paper className={classes.desktopDrawer}>
            <Box height="100%" display="flex" flexDirection="column">
                <Box p={2}>
                    <List>
                        {sections.map((section) => {
                            const open = matchPath(location.pathname, {
                                path: section.href,
                                exact: false,
                            })
                            return (
                                <ListItem
                                    className={classes.item}
                                    disableGutters
                                >
                                    <NavItem
                                        depth={0}
                                        open={Boolean(open)}
                                        href={section.href}
                                        icon={section.icon}
                                        info={section.info}
                                        key={section.title}
                                        title={section.title}
                                        disabled={section.disabled}
                                        external={section.external}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
            </Box>
        </Paper>
    )
}

NavBar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool,
}

export default NavBar
