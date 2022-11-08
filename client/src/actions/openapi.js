import axios from 'axios'

export const { REACT_APP_API_URL } = process.env

if (REACT_APP_API_URL) {
    axios.defaults.baseURL = REACT_APP_API_URL
    axios.defaults.withCredentials = true
}

export async function resetPassword(emailAddress) {
    const client = await Promise.resolve()
    const response = await client.reset_password_auth_reset_password_post(
        null,
        { email_address: emailAddress }
    )
    return response.data
}

export async function confirmPassword({
    emailAddress,
    password,
    confirmationCode,
}) {
    const client = await Promise.resolve()
    const response =
        await client.set_password_with_confirmation_auth_confirm_password_post(
            null,
            {
                username: emailAddress,
                password,
                confirmation_code: confirmationCode,
            }
        )
    return response.data
}

export async function getCurrentUser() {
    const client = await Promise.resolve()
    const response = await client.get_current_user_user_self_get({}, null)
    return response.data
}

export async function getOrganization() {
    const client = await Promise.resolve()
    const response = await client.get_organizations_self_organizations_self_get(
        {},
        null
    )
    return response.data
}

export async function updateUserDetails(
    params = { firstName: '', lastName: '', emailAddress: '' }
) {
    const client = await Promise.resolve()
    const response = await client.update_user_details_user_put(null, {
        first_name: params.firstName,
        last_name: params.lastName,
        email_address: params.emailAddress,
    })
    return response.data
}

export async function updateUserPassword(params = {}) {
    const client = await Promise.resolve()
    const response = await client.update_password_user_update_password_post(
        null,
        {
            previous_password: params.oldPassword,
            proposed_password: params.newPassword,
        }
    )
    return response.data
}

export async function getAllUsers() {
    const client = await Promise.resolve()
    const response = await client.get_all_users_user__get({}, null)
    return response.data
}

export async function createUser(params) {
    const client = await Promise.resolve()
    const response = await client.create_new_user_user_post(null, {
        first_name: params.firstName,
        last_name: params.lastName,
        email_address: params.emailAddress,
        organization: params.organizationId,
    })
    return response.data
}

export async function deleteUser(params) {
    const client = await Promise.resolve()
    const response = await client.delete_user_user__user_id__delete(params.id, {
        user_id: params.id,
    })
    return response.data
}
