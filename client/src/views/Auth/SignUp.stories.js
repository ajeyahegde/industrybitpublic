import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SignUp from './SignUp'
import LogIn from './LogIn'
import PasswordReset from './PasswordReset'
import Verification from './Verification'

import { initialState } from '../Assessment/formState'

const onFormPost = async (payload) => {
    console.log(payload)
    return Promise.resolve()
}
const onFormPostReject = async (payload) => {
    console.log(payload)
    return Promise.reject('failure message')
}

storiesOf('limis/Auth/SignUp', module)
    .add('Default', () => (
        <SignUp quoteFormData={initialState} onFormPost={onFormPost} />
    ))
    .add('Failure case', () => (
        <SignUp quoteFormData={initialState} onFormPost={onFormPostReject} />
    ))
    .add('Login', () => <LogIn />)
    .add('Reset Password', () => <PasswordReset />)
    .add('Verification', () => <Verification />)
