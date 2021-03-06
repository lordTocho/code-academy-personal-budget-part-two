'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BudgetEnvelope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BudgetEnvelope.init({
    BudgetEnvelopeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    EnvelopeDescription: DataTypes.STRING,
    Budget: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BudgetEnvelope',
  });
  return BudgetEnvelope;
};