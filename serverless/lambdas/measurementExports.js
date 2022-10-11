const { StationMeasurement } = require('../models')

const { Parser } = require('json2csv')

async function measurementExportsHandler(event, context) {
    const { routeKey } = event

    switch (routeKey) {
        case 'POST /api/exports':
            return {
                statusCode: 200,
                body: await generateMeasurementExport(event),
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

async function generateMeasurementExport(event, context) {
    const { organizationId } = JSON.parse(event.body)
    const measurements = await requestAllMeasurements(organizationId)

    const json2csvParser = new Parser()
    const csv = json2csvParser.parse(measurements)

    return csv
}

async function requestAllMeasurements(organizationId) {
    return await StationMeasurement.getAllStationMeasurements(
        organizationId
    ).catch((e) => {
        console.log(e)
    })
}

exports.measurementExportsHandler = measurementExportsHandler
exports.generateMeasurementExport = generateMeasurementExport
