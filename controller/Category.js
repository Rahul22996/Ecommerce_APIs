const CATEGORY = require('../model/category');

// -------------------------------------------------------------------------------------------------------------

exports.add_Category = async function (req, res, next) {
    try {
        req.body.image = req.file.filename
        if (!req.body.name || !req.body.image) {
            throw new Error("Please Enter Valid Fields")
        }

        const data = await CATEGORY.create(req.body);

        res.status(201).json({
            status: "Success",
            message: "Category Added",
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

exports.show_All_Category = async function (req, res, next) {
    try {

        const data = await CATEGORY.find();

        res.status(201).json({
            status: "Success",
            message: "All Categories",
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

exports.update_Category = async function (req, res, next) {
    try {
        if (req.file) {
            req.body.image = req.file.filename
        }
        let cid = req.params.cid
        const data = await CATEGORY.findByIdAndUpdate(cid, req.body, { new: true });

        res.status(201).json({
            status: "Success",
            message: "Category Updated",
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

exports.delete_Category = async function (req, res, next) {
    try {
        let cid = req.params.cid

        const data = await CATEGORY.findByIdAndDelete(cid);

        res.status(201).json({
            status: "Success",
            message: "Category Deleted",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}