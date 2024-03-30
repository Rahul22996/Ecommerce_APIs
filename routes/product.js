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

router.post('/add_product', upload.single('image'), productController.add_Product);
router.get('/show_all_product', productController.show_All_Product);
router.get('/show_one_product/:pid', productController.show_one_Product);
router.get('/show_company_product/:cid', productController.show_Company_Product);
router.get('/show_category_product/:cid', productController.show_Category_Product);
router.patch('/update_product/:pid', upload.single('image'), productController.update_Product);
router.delete('/delete_product/:pid', productController.delete_Product);

router.post('/add_review/:uid/:pid', productController.add_review);

module.exports = router;                 
