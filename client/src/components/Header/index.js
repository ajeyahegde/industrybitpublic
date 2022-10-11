import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import NavBar from './NavBar'
import TopBar from './TopBar'
import BreadCrumbs from './BreadCrumbs'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        width: '100%',
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        // [theme.breakpoints.up('lg')]: {
        //     paddingLeft: 256,
        // },
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto',
    },
}))

const Header = ({ children }) => {
    const classes = useStyles()
    const [isMobileNavOpen, setMobileNavOpen] = useState(false)

    return (
        <div className={classes.root}>
            <TopBar
                onMobileNavOpen={() => setMobileNavOpen(!isMobileNavOpen)}
            />
            <NavBar
                onMobileClose={() => setMobileNavOpen(false)}
                openMobile={isMobileNavOpen}
            />
            <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                    <div className={classes.content}>
                        <BreadCrumbs />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

Header.propTypes = {
    children: PropTypes.node,
}

export default Header
