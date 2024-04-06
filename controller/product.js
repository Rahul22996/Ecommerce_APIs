const PRODUCT = require('../model/product');
const REVIEW = require('../model/review');

// -------------------------------------------------------------------------------------------------------------

exports.add_Product = async function (req, res, next) {
    try {
        req.body.image = req.file.filename

        if (!req.body.name || !req.body.image || !req.body.price || !req.body.category || !req.body.company) {
            throw new Error("Please Enter Valid Fields")
        }

        const data = await PRODUCT.create(req.body);

        res.status(201).json({
            status: "Success",
            message: "Product Added",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.show_All_Product = async function (req, res, next) {
    try {

        const data = await PRODUCT.find().populate('category');

        res.status(201).json({
            status: "Success",
            message: "All Products",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.show_one_Product = async function (req, res, next) {
    try {
        let p_id = req.params.pid
        const data = await PRODUCT.findOne({ "_id": p_id }).populate('reviews');

        res.status(201).json({
            status: "Success",
            message: "All Products",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.show_Company_Product = async function (req, res, next) {
    try {
        let comp_id = req.params.cid
        const data = await PRODUCT.find({ "company": comp_id }).populate('company');

        res.status(201).json({
            status: "Success",
            message: "All Products",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.show_Category_Product = async function (req, res, next) {
    try {
        let cat_id = req.params.cid
        const data = await PRODUCT.find({ "category": cat_id }).populate('category');

        console.log(data);

        res.status(201).json({
            status: "Success",
            message: "All Products",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.update_Product = async function (req, res, next) {
    try {
        if (req.file) {
            req.body.image = req.file.filename
        }
        let pid = req.params.pid

        const data = await PRODUCT.findByIdAndUpdate(pid, req.body, { new: true });

        res.status(201).json({
            status: "Success",
            message: "Product Updated",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.delete_Product = async function (req, res, next) {
    try {
        let pid = req.params.pid

        const data = await PRODUCT.findByIdAndDelete(pid);

        res.status(201).json({
            status: "Success",
            message: "Product Deleted",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.add_review = async function (req, res, next) {
    try {
        let user_id = req.params.uid
        let p_id = req.params.pid
        req.body.uid = user_id

        if (!req.body.review) {
            throw new Error("Please Enter Valid Fields")
        }

        const data = await REVIEW.create(req.body);

        const data1 = await PRODUCT.findOneAndUpdate(
            { "_id": p_id },
            { $push: { reviews: data } },
            { new: true }
        ).populate('reviews');
        console.log(data1);

        res.status(201).json({
            status: "Success",
            message: "Review Added",
            data1
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}
