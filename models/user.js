'use strict';


const {
  Model,Sequelize
} = require('sequelize');

const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany( models.BudgetEnvelope, {
        foreignKey: 'userId'
      } );
      models.BudgetEnvelope.belongsTo( User, {foreignKey: 'userId'})

    }
  };
  User.init({
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};