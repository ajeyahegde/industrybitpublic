import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
    AppBar,
    IconButton,
    Hidden,
    Button,
    Toolbar,
    Box,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import Account from './Account'
import { THEMES } from 'src/constants'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

const useStyles = makeStyles((theme) => ({
    root: {
        // zIndex: theme.zIndex.drawer + 1000,
        boxShadow: 'none',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        height: '68px',
    },
    toolbar: {
        minHeight: 64,
        alignSelf: 'flex-end',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerButton: {
        height: '120px',
        width: '120px',
        // height: '120px',
        // width: '120px',
    },
    hamburgerbutton: {},
    hamburger: {
        color: 'white',
    },
}))

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
    const classes = useStyles()

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Toolbar className={classes.toolbar}>
                <Box style={{ marginLeft: '55px' }}>
                    <Typography variant="h2">IndustryBit</Typography>
                </Box>
                <Account className={classes.headerButton} />
            </Toolbar>
        </AppBar>
    )
}

TopBar.propTypes = {
    className: PropTypes.string,
    onMobileNavOpen: PropTypes.func,
}

TopBar.defaultProps = {
    onMobileNavOpen: () => {},
}

export default TopBar
