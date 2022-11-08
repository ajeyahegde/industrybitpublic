const { sequelize, Organization } = require('../models')

async function organizationsHandler(event, context) {
    const { routeKey } = event
    const organizationId = event?.pathParameters?.id

    switch (routeKey) {
        case 'GET /api/organizations':
            return {
                statusCode: 200,
                body: JSON.stringify(await getAllOrganizations()),
            }
        case 'GET /api/organizations/{id}':
            return {
                statusCode: 200,
                body: JSON.stringify(await getOrganization(organizationId)),
            }

        case 'POST /api/organizations':
            return {
                statusCode: 200,
                body: JSON.stringify(await createOrganization(event, context)),
            }
        default:
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Not found',
                }),
            }
    }
}

async function getOrganization(id) {
    await sequelize.sync();
    const test = await Organization.findAll()
    return {
        id,
        emailAddress: 'john.doe@gmail.com',
        name: 'John Doe',
        organization: 'IndustryBit',
        role: 'admin',
    }
}

async function getAllOrganizations() {
    await sequelize.sync();
    let organizations = await Organization.findAll()
    return organizations
}

async function createOrganization(event, context) {
    await sequelize.sync();
    const { organizationName, ownerEmail } = JSON.parse(event.body)
    return await Organization.create({
        organizationName,
        ownerEmail,
    })
}

exports.getOrganization = getOrganization
exports.getAllOrganizations = getAllOrganizations
exports.createOrganization = createOrganization
exports.organizationsHandler = organizationsHandler
