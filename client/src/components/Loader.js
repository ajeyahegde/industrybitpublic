import React from 'react'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderImg: {
        height: '100px',
    },
}))

export default function Loader(props) {
    const styles = useStyles()

    return (
        <Box className={styles.main}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => 2000 }}
                open={true}
            >
                <CircularProgress color="primary" variant="indeterminate" />
            </Backdrop>
        </Box>
    )
}
