'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Station extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            const { Organization, Station } = models
        }
    }
    Station.init(
        {
            zoneId: DataTypes.INTEGER,
            stationTitle: DataTypes.STRING,
            stationDescription: DataTypes.STRING,
            lastAccess: DataTypes.DATE,
            measurementUnit: DataTypes.STRING,
            target: DataTypes.DECIMAL(10, 2),
            rangeLow: DataTypes.DECIMAL(10, 2),
            rangeHigh: DataTypes.DECIMAL(10, 2),
        },
        {
            sequelize,
            modelName: 'Station',
        }
    )
    return Station
}
