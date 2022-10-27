const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Image: {
        type: String
    },   
},
    {
        timestamps: true,
    });


const Promotion = mongoose.model("Promotion", PromotionSchema);
module.exports = Promotion;
