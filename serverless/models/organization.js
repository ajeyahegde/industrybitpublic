'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Organization extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            const { User, Organization } = models
            Organization.hasMany(User, {
               foreignKey: 'organizationId',
               sourceKey: 'id',
            })
        }
    }
    Organization.init(
        {
            organizationName: DataTypes.STRING,
            ownerEmail: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Organization',
        }
    )
    return Organization
}
