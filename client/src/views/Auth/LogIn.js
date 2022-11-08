import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
    Box,
    Button,
    CardContent,
    CircularProgress,
    Divider,
    FormHelperText,
    FormControl,
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
import useAuth from 'src/hooks/useAuth'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '572px',
        paddingBottom: theme.spacing(3),
    },
    resetLink: {
        marginTop: theme.spacing(2),
    },
}))

const LogIn = () => {
    const classes = useStyles()
    const [isAlertVisible, setAlertVisible] = useState(false)
    const [displayPassword, setPasswordVisibility] = useState(false)
    const context = useAuth()

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email().required('Required'),
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
                await context
                    .login(values.email, values.password)
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
                <Box
                    className={clsx('Signup', classes)}
                    maxWidth={480}
                    margin="auto"
                    marginTop="5em"
                >
                    <Paper>
                        <CardContent>
                            <Box pt={2} pb={4}>
                                <Typography
                                    variant="h4"
                                    color="textPrimary"
                                    align="center"
                                >
                                    Sign In to IndustryBit
                                </Typography>
                            </Box>

                            <Divider />
                            {isAlertVisible && (
                                <Box mb={3}>
                                    <Alert
                                        onClose={() => setAlertVisible(false)}
                                        severity="error"
                                    >
                                        Failed to authenticate User
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
                                            <Box className={classes.resetLink}>
                                                <Link
                                                    to="/reset"
                                                    component={RouterLink}
                                                    underline={'always'}
                                                >
                                                    Forgot Your Password?
                                                </Link>
                                            </Box>
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
                                            justifyContent="space-between"
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
                                                Log In
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

LogIn.propTypes = {
    onSubmit: PropTypes.func,
}

LogIn.defaultProps = {}

export default LogIn
