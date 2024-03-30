const COMPANY = require('../model/company');

// -------------------------------------------------------------------------------------------------------------

exports.add_Company = async function (req, res, next) {
    try {
        req.body.image = req.file.filename
        if (!req.body.name || !req.body.image) {
            throw new Error("Please Enter Valid Fields")
        }

        const data = await COMPANY.create(req.body);

        res.status(201).json({
            status: "Success",
            message: "Company Added",
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

exports.show_Company = async function (req, res, next) {
    try {

        const data = await COMPANY.find();

        res.status(201).json({
            status: "Success",
            message: "All Companies",
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

exports.update_Company = async function (req, res, next) {
    try {
        if (req.file) {
            req.body.image = req.file.filename
        }
        let cid = req.params.cid
        const data = await COMPANY.findByIdAndUpdate(cid, req.body, { new: true });

        res.status(201).json({
            status: "Success",
            message: "Company Updated",
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

exports.delete_Company = async function (req, res, next) {
    try {
        let cid = req.params.cid

        const data = await COMPANY.findByIdAndDelete(cid);

        res.status(201).json({
            status: "Success",
            message: "Company Deleted",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}