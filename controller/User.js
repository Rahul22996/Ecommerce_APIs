const USER = require('../model/User')
const CART = require("../model/cart")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var Storage = require('node-persist');Storage.init()
// ---------------------------------------------------------------------------------------------------------------

exports.Signup = async function (req, res, next) {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            throw new Error("Please Enter Valid Fields")
        }

        const checkUser = await USER.findOne({email : req.body.email})

        if(checkUser){
            throw new Error("Email is Already Used")
        }

        req.body.password = await bcrypt.hash(req.body.password, 9)

        const data = await USER.create(req.body);

        let user_id = data._id
        req.body.uid = user_id

        let cart = await CART.create(req.body)

        res.status(201).json({
            status: "Success",
            message: "Signup Successful",
            data,
            cart
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}
// ---------------------------------------------------------------------------------------------------------------

exports.Login = async function (req, res, next) {
    try {
        if (!req.body.email || !req.body.password) {
            throw new Error("Please Enter Valid Fields")
        }

        const checkUser = await USER.findOne({ email: req.body.email });
        var uid = await Storage.setItem('uid', checkUser.id)
        
        console.log(uid)

        if (!checkUser) {
            throw new Error("Enter Valid Email")
        }

        const checkPass = await bcrypt.compare(req.body.password, checkUser.password);

        if (!checkPass) {
            throw new Error("Wrong Password")
        }

        res.status(201).json({
            status: "Success",
            message: "Login Successful",
            checkUser
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// exports.oneUser = async function (req, res, next) {
//     try {
//         const data = await USER.findById(req.userId);
        
//         res.status(201).json({
//             status: "Success",
//             message: "All Users",
//             data
//         })
//     } catch (error) {
//         res.status(404).json({
//             status: "Fail",
//             message: error.message
//         })
//     }
// }

// exports.Secure = async function (req, res, next) {
//     try {
//         const token = req.headers.token
//         if (!token) {
//             throw new Error("Please Get A Token")
//         }

//         var decoded = jwt.verify(token, 'pass');

//         const checkUser = await USER.findById(decoded.id)

//         if (!checkUser) {
//             throw new Error("User not Found")
//         }

//         req.userId = decoded.id
//         next()

//     } catch (error) {
//         res.status(404).json({
//             status: "Fail",
//             message: error.message
//         })
//     }
// }