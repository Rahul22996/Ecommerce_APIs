var express = require('express');
var router = express.Router();
const productController = require('../controller/product');
const multer  = require('multer')

/* Multer Storage */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/product_images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

/* GET products listing. */

router.post('/add_product', upload.single('image'), productController.addProduct);
router.get('/show_product', productController.showProduct);
router.patch('/update_product/:id', upload.single('image'), productController.updateProduct);
router.delete('/delete_product/:id', productController.deleteProduct);

module.exports = router;                 
