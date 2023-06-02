const express = require('express');
const router = express.Router();
const product = require('../controllers/product');
const component = require('../controllers/component');
const supplier = require('../controllers/supplier');


router.get('/', (req, res) => res.status(200).json({message: "welcome to blog api"}));

router.get('/products', product.index); // get all product
router.get('/products/:product_id', product.show); // get detail product
router.post('/products', product.store); // create new product
router.put('/products/:product_id', product.update); // update product
router.delete('/products/:product_id', product.destroy); // delete product
// router.post('/products/product-component', product.addProductComponent);

router.get('/components', component.index); // get all component
router.get('/components/:component_id', component.show); // get detail component
router.post('/components', component.store); // create new component
router.put('/components/:component_id', component.update); // update component
router.delete('/components/:component_id', component.destroy); // delete component
// router.post('/components/component-supplier', component.addSupplierComponent);

router.get('/suppliers', supplier.index); // get all supplier
router.get('/suppliers/:supplier_id', supplier.show); // get detail supplier
router.post('/suppliers', supplier.store); // create new supplier
router.put('/suppliers/:supplier_id', supplier.update); // update supplier
router.delete('/suppliers/:supplier_id', supplier.destroy); // delete supplier

router.get("/error", (req, res) => {
    let data = {
      status: false,
      message: "error!",
      data: null,
    };
    return res.status(500).json(data);
});

module.exports = router;