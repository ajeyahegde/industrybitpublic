import Alert from '@mui/material/Alert'
import React from 'react'
import { useToastContext, REMOVE } from '../context/ToastContext'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
    main: {
        position: 'fixed',
        top: '100px',
        right: '10px',
        maxHeight: '90vh',
    },
    alertContainer: {
        marginBottom: '15px',
    },
}))

export default function Toast({ toast }) {
    const { removeToast } = useToastContext()
    const styles = useStyles()

    return (
        <div className={styles.main}>
            {toast.map((t) => {
                const severity = t.content.severity || 'success'
                return (
                    <div key={t.id} className={styles.alertContainer}>
                        <Alert
                            onClose={() => {
                                removeToast(t.id)
                            }}
                            severity={severity}
                            sx={{ width: '100%' }}
                        >
                            <span>{t.content.message}</span>
                        </Alert>
                    </div>
                )
            })}
        </div>
    )
}
