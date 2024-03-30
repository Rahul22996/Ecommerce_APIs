const CART = require('../model/cart')
var Storage = require('node-persist'); Storage.init()

exports.addto_Cart = async function (req, res, next) {
    try {
        let userid = req.params.uid
        let p_id = req.params.pid
        let data = await CART.findOneAndUpdate(
            { "uid": userid },
            { $push: { "product": p_id } },
            { new: true })
        console.log(data);
        res.status(201).json({
            status: "Success",
            message: "Item Added to Cart",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Fail to Add Item"
        })
    }
}

exports.show_Cart = async function (req, res, next) {
    try {
        let userid = req.params.uid

        const data = await CART.findOne({ "uid": userid }).populate('product')
        
        res.status(201).json({
            status: "Success",
            message: "User's Cart",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Fail to Load Cart"
        })
    }
}

exports.remove_product = async function (req, res, next) {
    try {

        let userid = req.params.uid
        let pid = req.params.pid

        const data = await CART.findOneAndUpdate(
            { "uid": userid },
            { $pull: { product: pid } },
            { new: true } // Return the modified document
        );
        console.log(data);

        res.status(201).json({
            status: "Success",
            message: "Product is Removed",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Fail to Remove"
        })
    }
}
