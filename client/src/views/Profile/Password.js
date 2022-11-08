import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
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
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { updateUserPassword } from 'src/actions/openapi'

const useStyles = makeStyles(() => ({
    root: {},
    cardInput: {
        width: '40%',
    },
    passwordButton: {
        width: '184px',
    },
}))

const Password = ({ className, ...rest }) => {
    const classes = useStyles()
    const [showCurrentPassword, toggleCurrentPassword] = useState(false)
    const [showNewPassword, toggleNewPassword] = useState(false)

    return (
        <Formik
            initialValues={{
                currentPassword: '',
                newPassword: '',
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                currentPassword: Yup.string()
                    .min(7, 'Must be at least 7 characters')
                    .max(255)
                    .required('Required'),
                newPassword: Yup.string()
                    .min(7, 'Must be at least 7 characters')
                    .max(255)
                    .required('Required'),
            })}
            onSubmit={async (
                values,
                { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
                try {
                    setSubmitting(true)
                    await updateUserPassword({
                        oldPassword: values.currentPassword,
                        newPassword: values.newPassword,
                    })
                    setStatus({ success: true })
                } catch (err) {
                    console.error(err)
                    setStatus({ success: false })
                    setErrors({ submit: err.message })
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
                touched,
                values,
            }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Card
                            className={clsx(classes.root, className)}
                            {...rest}
                        >
                            <CardHeader title="Password" />
                            <Divider />
                            <CardContent>
                                <Box
                                    display={'flex'}
                                    width="100%"
                                    justifyContent="space-between"
                                >
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                        className={classes.cardInput}
                                        style={{ width: '49%' }}
                                    >
                                        <InputLabel htmlFor="outlined-current-password">
                                            Current Password
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-current-password"
                                            error={Boolean(
                                                touched.currentPassword &&
                                                    errors.currentPassword
                                            )}
                                            helperText={
                                                touched.currentPassword &&
                                                errors.currentPassword
                                            }
                                            label="Current Password"
                                            name="currentPassword"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type={
                                                showCurrentPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={values.currentPassword}
                                            variant="outlined"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => {
                                                            toggleCurrentPassword(
                                                                !showCurrentPassword
                                                            )
                                                        }}
                                                        onMouseDown={(e) =>
                                                            e.preventDefault
                                                        }
                                                        edge="end"
                                                    >
                                                        {showCurrentPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                        style={{ width: '49%' }}
                                        className={classes.cardInput}
                                    >
                                        <InputLabel htmlFor="outlined-current-password">
                                            New Password
                                        </InputLabel>
                                        <OutlinedInput
                                            error={Boolean(
                                                touched.newPassword &&
                                                    errors.newPassword
                                            )}
                                            helperText={
                                                touched.newPassword &&
                                                errors.newPassword
                                            }
                                            label="New Password"
                                            name="newPassword"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type={
                                                showNewPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={values.newPassword}
                                            variant="outlined"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => {
                                                            toggleNewPassword(
                                                                !showNewPassword
                                                            )
                                                        }}
                                                        onMouseDown={(e) =>
                                                            e.preventDefault
                                                        }
                                                        edge="end"
                                                    >
                                                        {showNewPassword ? (
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
                                    className={classes.passwordButton}
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                >
                                    {isSubmitting ? (
                                        <CircularProgress
                                            size={24}
                                            color="white"
                                        />
                                    ) : (
                                        'Change Password'
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

Password.propTypes = {
    className: PropTypes.string,
}

export default Password
