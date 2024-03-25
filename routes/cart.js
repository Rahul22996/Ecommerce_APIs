var express = require('express');
var router = express.Router();
const cartController = require('../controller/Cart')

/* GET users listing. */

router.post('/add_cart/:id', cartController.addtoCart);
router.get('/showcart', cartController.showCart);
router.delete('/delete_cart/:id', cartController.deleteProduct);

module.exports = router;             
