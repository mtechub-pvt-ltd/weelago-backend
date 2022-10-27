const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Image: {
        type: String
    },
    Price: {
        type: Number,
    },
    Quantity: {
        type: Number,
    },
    Description: {
        type: String
    },
    Category: {
        type: String,
        default:''
    },
    BrandName: {
        type: String,
        default:''
    },
    Status: {
        type: String,
        enum: ["Available","OutOfStock"],
        default: "Available"
    },
    Deal: {
        type: Boolean,
        default: false
    },
    DealName: {
        type: String,
    },
    DealPrice: {
        type: Number,
    },
    DealDescription: {
        type: String,
    },
    
    
},
    {
        timestamps: true,
    });


const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
