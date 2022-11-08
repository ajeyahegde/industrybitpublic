import React, { useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    FormHelperText,
    Grid,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import { updateUserDetails } from 'src/actions/openapi'

const useStyles = makeStyles(() => ({
    root: {},
    profileButton: { width: '148px' },
}))

const GeneralSettings = ({ className, user, ...rest }) => {
    const classes = useStyles()

    return (
        <Formik
            enableReinitialize
            initialValues={{
                emailAddress: user?.emailAddress || '',
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                // phone: user?.phone || '',
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                emailAddress: Yup.string()
                    .email('Must be a valid email')
                    .max(255)
                    .required('Email is required'),
                firstName: Yup.string()
                    .max(255)
                    .required('First name is required'),
                lastName: Yup.string()
                    .max(255)
                    .required('Last name is required'),
                // phone: Yup.string(),
            })}
            onSubmit={async (
                values,
                { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
                try {
                    setSubmitting(true)
                    await updateUserDetails(values)
                    setStatus({ success: true })
                } catch (err) {
                    console.error(err)
                    setStatus({ success: false })
                    setErrors({ submit: err.message })
                    setSubmitting(false)
                } finally {
                    setSubmitting(false)
                }
            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                status,
                touched,
                values,
            }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Card
                            className={clsx(classes.root, className)}
                            {...rest}
                        >
                            <CardHeader title="Profile" />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={4}>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            error={Boolean(
                                                touched.firstName &&
                                                    errors.firstName
                                            )}
                                            fullWidth
                                            helperText={
                                                touched.firstName &&
                                                errors.firstName
                                            }
                                            label="First Name"
                                            name="firstName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            required
                                            value={values.firstName}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            error={Boolean(
                                                touched.lastName &&
                                                    errors.lastName
                                            )}
                                            fullWidth
                                            helperText={
                                                touched.lastName &&
                                                errors.lastName
                                            }
                                            label="Last Name"
                                            name="lastName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            required
                                            value={values.lastName}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            error={Boolean(
                                                touched.emailAddress &&
                                                    errors.emailAddress
                                            )}
                                            fullWidth
                                            label="Email Address"
                                            name="emailAddress"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            required
                                            type="email"
                                            value={values.emailAddress}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    {/* <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.phone && errors.phone
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.phone && errors.phone
                                        }
                                        label='Phone Number'
                                        name='phone'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.phone}
                                        variant='outlined'
                                    />
                                </Grid> */}
                                </Grid>
                                {errors.submit && (
                                    <Box mt={3}>
                                        <FormHelperText error>
                                            {errors.submit}
                                        </FormHelperText>
                                    </Box>
                                )}
                            </CardContent>
                            <Divider />
                            <Box
                                p={2}
                                display="flex"
                                justifyContent="flex-start"
                            >
                                <Button
                                    color="primary"
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    className={classes.profileButton}
                                >
                                    {isSubmitting ? (
                                        <CircularProgress
                                            size={24}
                                            color="white"
                                        />
                                    ) : (
                                        'Save Changes'
                                    )}
                                </Button>
                            </Box>
                        </Card>
                    </form>
                )
            }}
        </Formik>
    )
}

GeneralSettings.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired,
}

export default GeneralSettings
