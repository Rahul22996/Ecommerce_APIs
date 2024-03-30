var express = require('express');
var router = express.Router();
const categoryController = require('../controller/Category');
const companyController = require('../controller/company');
const multer  = require('multer')

/* Multer Storage */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/category_images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

/* GET categories listing. */

router.post('/add_category', upload.single('image'), categoryController.add_Category);
router.get('/show_category', categoryController.show_All_Category);
router.patch('/update_category/:cid', upload.single('image'), categoryController.update_Category);
router.delete('/delete_category/:cid', categoryController.delete_Category);

router.post('/add_company', upload.single('image'), companyController.add_Company);
router.get('/show_company', companyController.show_Company);
router.patch('/update_company/:cid', upload.single('image'), companyController.update_Company);
router.delete('/delete_company/:cid', companyController.delete_Company);

module.exports = router;                 
