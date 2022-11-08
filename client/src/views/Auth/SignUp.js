import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as Yup from 'yup'
import { Formik, ErrorMessage } from 'formik'
import {
    Box,
    Button,
    CardContent,
    CircularProgress,
    Divider,
    FormHelperText,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    IconButton,
    Link,
    OutlinedInput,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Alert from '@mui/material/Alert'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '572px',
    },
}))

const SignUp = ({ quoteFormData, onFormPost }) => {
    const classes = useStyles()
    const [isAlertVisible, setAlertVisible] = useState(false)
    const [displayPassword, setPasswordVisibility] = useState(false)

    return (
        <Formik
            initialValues={{
                companyName: '',
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                companyName: Yup.string().required('Required'),
                email: Yup.string().email().required('Required'),
                firstName: Yup.string().required('Required'),
                lastName: Yup.string().required('Required'),
                password: Yup.string()
                    .min(7, 'Must be at least 7 characters')
                    .max(255)
                    .required('Required'),
            })}
            onSubmit={async (
                values,
                { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
                setSubmitting(true)
                await onFormPost({
                    ...quoteFormData,
                    registration: {
                        username: values.email,
                        company_name: values.companyName,
                    },
                })
                    .then(() => {
                        setStatus({ success: true })
                        setSubmitting(false)
                        resetForm()
                    })
                    .catch((err) => {
                        console.error(err)
                        setStatus({ success: false })
                        setErrors({ submit: err.message })
                        setSubmitting(false)
                        setAlertVisible(true)
                    })
            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
            }) => (
                <Box className={clsx('Signup', classes)} maxWidth={480}>
                    <Paper>
                        <CardContent>
                            <Box pt={6} pb={6}>
                                <Typography
                                    variant="h3"
                                    color="textPrimary"
                                    align="center"
                                >
                                    Sign up for IndustryBit
                                </Typography>
                            </Box>

                            <Divider />
                            {isAlertVisible && (
                                <Box mb={3}>
                                    <Alert
                                        onClose={() => setAlertVisible(false)}
                                        severity="error"
                                    >
                                        Failed to register User
                                    </Alert>
                                </Box>
                            )}
                            {isSubmitting ? (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    my={5}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <Box mt={3}>
                                    <form onSubmit={handleSubmit}>
                                        <Box>
                                            <Grid container spacing={2}>
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
                                                        value={values.lastName}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box mt={3}>
                                            <TextField
                                                error={Boolean(
                                                    touched.companyName &&
                                                        errors.companyName
                                                )}
                                                fullWidth
                                                helperText={
                                                    touched.companyName &&
                                                    errors.companyName
                                                }
                                                label="Company Name"
                                                name="companyName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.companyName}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box mt={3}>
                                            <TextField
                                                error={Boolean(
                                                    touched.email &&
                                                        errors.email
                                                )}
                                                fullWidth
                                                helperText={
                                                    touched.email &&
                                                    errors.email
                                                }
                                                label="Email Address"
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="email"
                                                value={values.email}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box mt={3}>
                                            <FormControl
                                                variant="outlined"
                                                fullWidth
                                            >
                                                <InputLabel htmlFor="outlined-adornment-password">
                                                    Password
                                                </InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    error={Boolean(
                                                        touched.password &&
                                                            errors.password
                                                    )}
                                                    fullWidth
                                                    helperText={
                                                        touched.password &&
                                                        errors.password
                                                    }
                                                    type={
                                                        displayPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    label="Password"
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    variant="outlined"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => {
                                                                    setPasswordVisibility(
                                                                        !displayPassword
                                                                    )
                                                                }}
                                                                onMouseDown={(
                                                                    e
                                                                ) =>
                                                                    e.preventDefault
                                                                }
                                                            >
                                                                {displayPassword ? (
                                                                    <Visibility />
                                                                ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Box>
                                        {Boolean(
                                            touched.policy && errors.policy
                                        ) && (
                                            <FormHelperText error>
                                                {errors.policy}
                                            </FormHelperText>
                                        )}
                                        <Box
                                            mt={3}
                                            justifyContent="center"
                                            display="flex"
                                        >
                                            <Button
                                                color="primary"
                                                disabled={isSubmitting}
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                align="center"
                                            >
                                                Sign up
                                            </Button>
                                        </Box>
                                    </form>
                                </Box>
                            )}
                        </CardContent>
                    </Paper>
                </Box>
            )}
        </Formik>
    )
}

SignUp.propTypes = {
    onSubmit: PropTypes.func,
}

SignUp.defaultProps = {}

export default SignUp
