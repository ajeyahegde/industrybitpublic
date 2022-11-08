/** **********************************************************
 *               DO NOT CHANGE THIS FILE
 ** ********************************************************** */
const usersApi = require('../lambdas/users.js');
const organizationApi = require('../lambdas/organizations.js');

test('FIX_ORGANIZATION', async () => {
    let createUser = async (firstName, lastName, email, role, orgId) => {
        const data = {
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                organizationId: orgId
            })
        }
        return await usersApi.createUser(data)
    }


    let createOrganization = async (name, email) => {
        const data = {
            body: JSON.stringify({
                organizationName: name,
                ownerEmail: email
            })
        }
        return await organizationApi.createOrganization(data)
    }

    // Create a few organization so the one we use ends up being more than id = 1
    await createOrganization("org1", "1@bit.ly");
    await createOrganization("org2", "2@bit.ly");
    await createOrganization("org3", "3@bit.ly");

    let organization = await createOrganization("org4", "4@bit.ly");

    let user = await createUser("John", "Doe", "john@mac.com", "user", organization.id);

    // Get the users
    let allUsers = await usersApi.getAllUsers();

    let releavantUser = allUsers.filter((el)=>el.id === user.id)
    expect(releavantUser.length).toEqual(1);
    expect(releavantUser[0].firstName).toEqual(user.firstName);
    expect(releavantUser[0].lastName).toEqual(user.lastName);
    expect(releavantUser[0].organizationId).toEqual(user.organizationId);
});
