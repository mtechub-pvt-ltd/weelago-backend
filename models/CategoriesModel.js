const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  Name: {
    type: String
  },
  Image: {
    type: String
  },
  Item: [{
    type: mongoose.Types.ObjectId,
    ref: 'Item',
  }]
},
  {
    timestamps: true,
  });


const Categories = mongoose.model("Categories", CategoriesSchema);
module.exports = Categories;
