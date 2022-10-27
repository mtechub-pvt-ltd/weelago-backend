const userModel = require('../models/userModel');
const ItemModel = require('../models/ItemModel');
const catchAsync = require('../utils/catchAsync');
const argon2 = require('argon2');
var jwt = require('jsonwebtoken');



//******Genrating token****/

const signToken = (user) => {
    const payload = {
        userdata: {
            id: user._id,
        },
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });
};
/***************Services************/

//SignUp -->
exports.SignUp = catchAsync(async (req, res, next) => {
    console.log("Req", req.body)
    const User = await userModel.find({ Email: req.body.Email })
    if (User.length < 1) {
        let data;
        if (req.file) { data = { Image: req.file.filename } }
        const Record = await userModel.create({ ...req.body, ...data })

        if (!Record) {
            throw new Error('Error! User cannot be created');
        }
        else {
            return res.status(201).json({
                success: true, message: "New User Account Created Successfully", Record
            })
        }
    }
    else {
        return next(new Error('Error! User with this Email already exist'))

    }

})

//Login -->
exports.Login = catchAsync(async (req, res, next) => {
    console.log("Req", req.body)
    const User = await userModel.find({ Email: req.body.Email })
    console.log("user===>", User[0])
    if (User[0]) {
        if (await argon2.verify(User[0].Password, req.body.Password)) {
            const token = signToken(User[0]);
            return res.status(200).json({
                success: true, message: "Login Successfully", token, User
            })
        }
        else {
            throw new Error('Error! Invalid Password');
        }
    }
    else {
        return next(new Error('User Not Found'))

    }
})

//Update -->
exports.Update = catchAsync(async (req, res, next) => {
    console.log("Req", req.body)

    const Response = await userModel.find({ Email: req.body.Email })

    if (Response.length > 0) {
        let data;
        if (req.file) { data = { Image: req.file.filename } }
        console.log("data", data)

        const Record = await userModel.updateOne({ Email: req.body.Email },
            { ...req.body, ...data });

        console.log(Record)
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "User Profile Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  User Profile Not-Updated "
        })

    }
    else {
        return next(new Error('User Not Found'))

    }
})


//Add Item to WishList
exports.AddItemToWishList = catchAsync(async (req, res, next) => {

    try {

        const User = await userModel.find({ Email: req.body.Email })
        User[0].WishList.map(WishList => {
            if (WishList == req.body.Id) {
                throw new Error(' Item already added in WishList')
            }
        })
        User[0].WishList.push(req.body.Id)
        User[0].save(async () => {
            return res.status(201).json({
                success: true, message: "Item Added to WishList Successfully"
            })
        })

    } catch (error) {
        throw new Error(error)
    }

})

//Remove Item form WishList
exports.RemoveItemFromWishList = catchAsync(async (req, res, next) => {

    try {
        const User = await userModel.find({ Email: req.body.Email })
        const index = User[0].WishList.indexOf(req.body.Id);
        console.log(index)
        if (index > -1) {
            User[0].WishList.splice(index, 1)
            User[0].save(async () => {
                return res.status(201).json({
                    success: true, message: "Item Removed From WishList Successfully"
                })
            })

        }
        else {
            throw new Error(' Item Not Found in WishList')
        }
    } catch (error) {
        throw new Error(error)
    }
})

//Get WishList
exports.GetWishList = catchAsync(async (req, res, next) => {
    const data = await userModel.aggregate([
        {
            $match:
            {
                Email: req.body.Email 
            }
        },
        {
            $lookup:
            {
                from: 'items',
                localField: 'WishList',
                foreignField: '_id',
                as: 'WishList'
            }
        },
        
    ])
    console.log("===>>>", data)
    if (data.length > 0) {
       
        return res.status(201).json({
            success: true, message: "Data Found", WishList:data[0].WishList
        })
    }
    else {
        throw new Error('Error! Data Not Found');
    }
    
})


//get all drivers list -->
exports.GetAllDrivers = catchAsync(async (req, res, next) => {
    const data = await userModel.aggregate([
        {
            $match:
            {
                Role: "Driver"
            }
        },

    ])
    console.log("===>>>", data)
    if (data[0]) {

        return res.status(201).json({
            success: true, message: "Data Found", data
        })
    }
    else {
        throw new Error('Error! Data Not Found');
    }

})
