
const PromotionsModel = require('../models/PromotionsModel');
const catchAsync = require('../utils/catchAsync');


/***************Services************/

//Add -->
exports.Add = catchAsync(async (req, res, next) => {
    let data;
    if (req.file) { data = { Image: req.file.filename } }
    console.log("data", data)

    const Record = await PromotionsModel.create({ ...req.body, ...data })
    if (!Record) {
        throw new Error('Error! Promotion cannot be created');
    }
    else {

        return res.status(201).json({
            success: true, message: "New Promotion Added Successfully", Record
        })
    }
})


//GetAll Items -->
exports.GetAll = catchAsync(async (req, res, next) => {

    const Response = await PromotionsModel.find()
    if (Response.length > 0) {
        console.log("===>>>", Response)
        return res.status(201).json({
            success: true, message: "Data Found", Response
        })
    }
    else {
        throw new Error('Error! Data Not Found');
    }

})

//Delete Items -->
exports.Delete = catchAsync(async (req, res, next) => {

    const Data = await PromotionsModel.deleteOne({ "_id": req.body.PromotionId })
    if (Data.deletedCount == 0) {
        return next(new Error('Error! Promotion item with this name not found'))
    }
    else {
        return res.status(201).json({
            success: true, message: "Promotion item Deleted Successfully"
        })


    }

})


