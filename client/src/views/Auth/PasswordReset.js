import React, { useState } from 'react'
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
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import useAuth from 'src/hooks/useAuth'
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '480px',
        margin: '0 auto',
        marginTop: theme.spacing(10),
    },
    resetPasswordText: {
        marginTop: theme.spacing(3),
        width: '90%',
        margin: `0 auto 0`,
    },
}))

const PasswordReset = () => {
    const classes = useStyles()
    const [isAlertVisible, setAlertVisible] = useState(false)

    const context = useAuth()
    const history = useHistory()

    return (
        <Formik
            initialValues={{
                email: '',
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email().required('Required'),
            })}
            onSubmit={async (
                values,
                { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
                setSubmitting(true)
                await context
                    .resetPassword(values.email)
                    .then(() => {
                        setStatus({ success: true })
                        setSubmitting(false)
                        resetForm()
                        history.push('/validate')
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
                <Paper className={clsx('Signup', classes.root)}>
                    <CardContent>
                        <Box pt={6} pb={6}>
                            <Typography
                                variant="h3"
                                color="textPrimary"
                                align="center"
                            >
                                Reset Password
                            </Typography>
                            <Typography
                                color="textSecondary"
                                className={classes.resetPasswordText}
                            >
                                Enter your email address that you used to log
                                in. We will send you a verification code used to
                                validate access.
                            </Typography>
                        </Box>

                        <Divider />
                        {isAlertVisible && (
                            <Box mb={3}>
                                <Alert
                                    onClose={() => setAlertVisible(false)}
                                    severity="error"
                                >
                                    Failed to reset password
                                </Alert>
                            </Box>
                        )}
                        {isSubmitting ? (
                            <Box display="flex" justifyContent="center" my={5}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Box mt={3}>
                                <form onSubmit={handleSubmit}>
                                    <Box mt={3}>
                                        <TextField
                                            error={Boolean(
                                                touched.email && errors.email
                                            )}
                                            fullWidth
                                            helperText={
                                                touched.email && errors.email
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

                                    {Boolean(
                                        touched.policy && errors.policy
                                    ) && (
                                        <FormHelperText error>
                                            {errors.policy}
                                        </FormHelperText>
                                    )}
                                    <Box
                                        mt={4}
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
                                            Submit
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        )}
                    </CardContent>
                </Paper>
            )}
        </Formik>
    )
}

PasswordReset.propTypes = {
    onSubmit: PropTypes.func,
}

PasswordReset.defaultProps = {}

export default PasswordReset
