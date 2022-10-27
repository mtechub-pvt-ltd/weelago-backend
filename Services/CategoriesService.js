const CategoriesModel = require('../models/CategoriesModel');
const ItemModel = require('../models/ItemModel');
const catchAsync = require('../utils/catchAsync');


/***************Services************/

//Add-->
exports.Add = catchAsync(async (req, res, next) => {
    console.log("hit", req.body)
    const Categories = await CategoriesModel.find({ Name: req.body.Name })

    if (Categories.length < 1) {
        let data;
        if (req.file) { data = { Image: req.file.filename } }
        console.log("data", data)
        const Record = await CategoriesModel.create({ ...req.body, ...data })
        if (!Record) {
            throw new Error('Error! Category cannot be created');
        }
        else {
            return res.status(201).json({
                success: true, message: "Category Added Successfully", Record
            })
        }


    }
    else {
        return next(new Error('Error! Category with this Name already exist'))

    }

})

//Update-->
exports.Update = catchAsync(async (req, res, next) => {

    const Response = await CategoriesModel.find({ Name: req.body.Name })
    if (Response.length > 0) {
        let data;
        if (req.file) { data = { Image: req.file.filename } }
        console.log("data", data)
        const Record = await CategoriesModel.updateOne({ Name: req.body.Name }, { ...req.body, ...data });
        console.log(Record.nModified)
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Category Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Category Not-Updated Successfully"
        })


    }
    else {
        return next(new Error('Error! Category with this Name not Found'))

    }

})

//GetAll-->
exports.GetAll = catchAsync(async (req, res, next) => {

    const data = await CategoriesModel.aggregate([
        {
            $lookup:
            {
                from: 'items',
                localField: 'Item',
                foreignField: '_id',
                as: 'Item'
            },
        },

    ])
    if (data.length > 0) {
        console.log("===>>>", data)
        return res.status(200).json({
            success: true, message: "Data Found", data
        })
    }
    else {
        throw new Error('Error! Data Not Found');
    }

})
//GetOne-->
exports.GetOne = catchAsync(async (req, res, next) => {

    const data = await CategoriesModel.aggregate(

        [{
            $match: {
                "Name": req.body.Name
            }
        }, {
            $lookup:
            {
                from: 'items',
                localField: 'Item',
                foreignField: '_id',
                as: 'Item'
            },
        }



        ])
    if (data.length > 0) {
        console.log("===>>>", data)
        return res.status(200).json({
            success: true, message: "Data Found", data
        })
    }
    else {
        throw new Error('Error! Data Not Found');
    }

})