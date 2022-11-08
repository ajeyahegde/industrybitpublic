import React, { useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {
    Avatar,
    Box,
    ButtonBase,
    Hidden,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import useAuth from 'src/hooks/useAuth'
// import CustomerPic from 'src/theme/s2/jake vector pic.png'

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: 32,
        width: 32,
        marginRight: theme.spacing(1),
    },
    popover: {
        width: 200,
    },
}))

const Account = () => {
    const classes = useStyles()
    const history = useHistory()
    const ref = useRef(null)
    const { user, logout } = useAuth()
    const [isOpen, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleLogout = async () => {
        try {
            handleClose()
            await logout()
            history.push('/')
        } catch (err) {}
    }

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                component={ButtonBase}
                onClick={handleOpen}
                ref={ref}
            >
                <Avatar
                    alt="User"
                    className={classes.avatar}
                    // src={CustomerPic}
                    // src={user.avatar}
                />
                <Hidden smDown>
                    <Typography variant="h6" color="inherit">
                        {user?.name || ''}
                    </Typography>
                </Hidden>
            </Box>
            <Menu
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                keepMounted
                PaperProps={{ className: classes.popover }}
                getContentAnchorEl={null}
                anchorEl={ref.current}
                open={isOpen}
            >
                <MenuItem component={RouterLink} to="/settings">
                    Profile
                </MenuItem>
                <MenuItem component={RouterLink} to="/account">
                    Account
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default Account
