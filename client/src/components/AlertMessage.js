import Alert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        top: theme.spacing(13),
        marginRight: theme.spacing(4),
    },
}))

const AlertMessage = ({ showAlert, setShowAlert }) => {
    const classes = useStyles()

    const handleClose = (e, reason) => {
        setShowAlert({
            ...showAlert,
            isOpen: false,
        })
    }

    return (
        <Snackbar
            className={classes.root}
            open={showAlert.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={showAlert.type}>
                {showAlert.message}
            </Alert>
        </Snackbar>
    )
}

export default AlertMessage
