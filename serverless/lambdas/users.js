const { User, sequelize } = require('../models')

async function usersHandler(event, context) {
    const { routeKey } = event
    const userId = event?.pathParameters?.id

    switch (routeKey) {
        case 'GET /api/users':
            return {
                statusCode: 200,
                body: JSON.stringify(await getAllUsers()),
            }
        case 'GET /api/users/{id}':
            return {
                statusCode: 200,
                body: JSON.stringify(await getUser(userId)),
            }

        case 'POST /api/users':
            return {
                statusCode: 200,
                body: JSON.stringify(await createUser(event, context)),
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

async function getUser(id) {
    await sequelize.sync();
    return await User.findByPk(id)
}

async function getUserByEmail(email) {
    await sequelize.sync();
    return await User.findAll({ where: { email: email } })
}

async function getAllUsers(context) {
    await sequelize.sync();
    let organizationId = 1
    return await User.findAll({ where: { organizationId } })
}

async function createUser(event, context) {
    await sequelize.sync();
    const { firstName, lastName, email, role, organizationId } = JSON.parse(
        event.body
    )
    return await User.create({
        firstName,
        lastName,
        email,
        role,
        organizationId,
    })
}

exports.getUser = getUser
exports.getAllUsers = getAllUsers
exports.getUserByEmail = getUserByEmail
exports.createUser = createUser
exports.usersHandler = usersHandler
