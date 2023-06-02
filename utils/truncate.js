const { Product, Supplier, Component } = require("../db/models");


module.exports = {
  product: async () => {
    await Product.destroy({ truncate: true, restartIdentity: true });
  },

  component: async () => {
    await Component.destroy({ truncate: true, restartIdentity: true });
  },

  supplier: async () => {
    await Supplier.destroy({ truncate: true, restartIdentity: true });
  },
  
};
