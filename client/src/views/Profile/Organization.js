import React, { useState } from 'react'

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import AlertMessage from 'src/components/AlertMessage'

const useStyles = makeStyles(() => ({
    root: {},
    cardInput: {
        width: '49%',
    },
    saveButton: {
        width: '148px',
    },
}))

const OrganizationSetting = () => {
    const classes = useStyles()
    const [files, setFiles] = useState([])
    const [isFileSelected, setFileSelected] = useState(false)
    const [showAlert, setShowAlert] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const fileSelected = () => {
        if (files.length > 0) {
            setFileSelected((isFileSelected) => true)
            setShowAlert({
                isOpen: true,
                message: 'Image Saved Successfully',
                type: 'success',
            })
        }
    }

    return (
        <form>
            <Card className={clsx(classes.root)}>
                <CardHeader title="Organization Logo" />
                <Divider />
                <CardContent>
                    <Box
                        display={'flex'}
                        width="100%"
                        justifyContent="space-between"
                    >
                        
                    </Box>
                </CardContent>
                <Divider />
                <Box p={2} display="flex" justifyContent="flex-start">
                    {isFileSelected ? (
                        <AlertMessage
                            showAlert={showAlert}
                            setShowAlert={setShowAlert}
                        />
                    ) : (
                        ''
                    )}
                </Box>
            </Card>
        </form>
    )
}

export default OrganizationSetting
