'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Component_Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Component.belongsToMany(models.Supplier, {
        through: models.Component_Supplier,
        foreignKey: "component_id",
      });
      models.Supplier.belongsToMany(models.Component, {
        through: models.Component_Supplier,
        foreignKey: "supplier_id",
      });

    }
  }
  Component_Supplier.init({
    supplier_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Component_Supplier',
  });
  return Component_Supplier;
};