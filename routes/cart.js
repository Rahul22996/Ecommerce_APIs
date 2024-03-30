var express = require('express');
var router = express.Router();
const cartController = require('../controller/Cart')

/* GET users listing. */

router.post('/add_cart/:uid/:pid', cartController.addto_Cart);
router.post('/show_cart/:uid', cartController.show_Cart);
router.post('/remove_product/:uid/:pid', cartController.remove_product);

module.exports = router;             
