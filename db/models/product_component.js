'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Component.belongsToMany(models.Product, {
        through: models.Product_Component,
        foreignKey: "component_id",
      });
      models.Product.belongsToMany(models.Component, {
        through: models.Product_Component,
        foreignKey: "product_id",
      });

    }
  }
  Product_Component.init({
    product_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Component',
  });
  return Product_Component;
};