const ItemModel = require('../models/ItemModel');
const CategoriesModel = require('../models/CategoriesModel');
const catchAsync = require('../utils/catchAsync');


/***************Services************/

//Add -->
exports.Add = catchAsync(async (req, res, next) => {

    const Response = await ItemModel.find({ Name: req.body.Name })

    if (Response.length < 1) {
        let data;
        if (req.file) { data = { Image: req.file.filename } }
        console.log("data", data)
        const Record = await ItemModel.create({ ...req.body,...data })
        if (!Record) {
            throw new Error('Error! Item cannot be created');
        }
        else {
            const Category = await CategoriesModel.find({ Name: req.body.Category})
            Category[0].Item.push(Record._id)
            await Category[0].save()
            return res.status(201).json({
                success: true, message: "Item Added Successfully", Record
            })
        }
    }
    else {
        return next(new Error('Error! Item with this Name already exist'))

    }

})

//Update -->
exports.Update = catchAsync(async (req, res, next) => {

    const Response = await ItemModel.find({ Name: req.body.Name })
    if (Response.length > 0) {
        let data;
        if (req.file) { data = { Image: req.file.filename } }
        console.log("data", data)
        const Record = await ItemModel.updateOne({ Name: req.body.Name }, { ...req.body,...data });
        console.log(Record.nModified)
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Item Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Item Not-Updated "
        })


    }
    else {
        return next(new Error('Error! Item with this Name not Found'))

    }

})

//GetAll Items -->
exports.GetAll = catchAsync(async (req, res, next) => {

    const Responce = await ItemModel.find()
    if (Responce.length > 0) {
        console.log("===>>>", Responce)
        return res.status(201).json({
            success: true, message: "Data Found", Responce
        })
    }
    else {
        throw new Error('Error! Data Not Found');
    }

})

//Delete Items -->
exports.Delete = catchAsync(async (req, res, next) => {

    const Responce = await ItemModel.find({ Name: req.body.Name })
    //if item found in record 
    console.log("==>", Responce)
    if (Responce.length > 0) {

        const DeleteItemRes = await ItemModel.deleteOne({ Name: req.body.Name })

        if (DeleteItemRes.deletedCount == 0) {
            return next(new Error('Error! Item with this Name not Found'))
        }
        else {
            console.log("item==>", Responce)
          
                //if item deleted
                console.log("Category Found==>")
                const Categories = await CategoriesModel.find({ Name: Responce[0].Category  })
                const index = Categories[0].Item.indexOf(Responce[0]._id);
                console.log("index",index)
                if (index > -1) {
                    Categories[0].Item.splice(index, 1)
                    Categories[0].save(async () => {
                        return res.status(201).json({
                            success: true, message: "Item Deleted Successfully"
                        })
                    })

                }

                else {
                    return res.status(201).json({
                        success: true, message: "Item Deleted Successfully"
                    })
                }
            

           



        }

    }
    else {
        return next(new Error('Error! Item with this Name not Found'))
    }

})



//GetOne Items-->
exports.GetOne = catchAsync(async (req, res, next) => {
    
    const Responce = await ItemModel.find({ ...req.body })
    if (Responce.length > 0) {
        console.log("===>>>", Responce)
        return res.status(201).json({
            success: true, message: "Data Found", Responce
        })
    }
    else {
        throw new Error('Error! NO Item with this Name Found');
    }

})

//Get Items Having Deal Items-->
exports.GetDealItem = catchAsync(async (req, res, next) => {

    const Responce = await ItemModel.find({ Deal:true })
    if (Responce.length > 0) {
        console.log("===>>>", Responce)
        return res.status(201).json({
            success: true, message: "Data Found", Responce
        })
    }
    else {
        throw new Error('Error! NO Data Found');
    }

})
