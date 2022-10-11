'use strict'
const { Model, QueryTypes } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class StationMeasurement extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            const { Station } = models
            StationMeasurement.belongsTo(Station, {
               foreignKey: 'stationId',
               onDelete: 'CASCADE',
            })
            // define association here
        }

        static async getAllStationMeasurements(organizationId) {
            return sequelize.query(
                fetchAllStationMeasurementsQuery(organizationId),
                { type: QueryTypes.SELECT }
            )
        }
    }
    StationMeasurement.init(
        {
            measurementValue: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'StationMeasurement',
        }
    )
    return StationMeasurement
}

const fetchAllStationMeasurementsQuery = (organizationId) => {
    return `select "zoneTitle" as zone, "stationTitle", "stationDescription", target, "rangeLow" as lowerRange, "rangeHigh" as upperRange, "measurementValue" as value, "measurementUnit" as unit, measurements."updatedAt" as lastUpdate  from "StationMeasurements" measurements
    inner join "Stations" stations
        on stations.id = measurements."stationId"
    inner join "Zones" zones
        on zones.id = stations."zoneId"
    inner join "Organizations" organizations
        on organizations.id = zones."organizationId"
        where organizations.id = ${organizationId};`
}
