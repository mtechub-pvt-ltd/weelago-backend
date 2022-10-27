const mongoose = require("mongoose");
const argon2 = require('argon2');
const userSchema = new mongoose.Schema({
  UserName: {
    type: String
  },
  Email: {
    type: String,
    lowercase: true,
  },
  Password: {
    type: String,
  },
  PhoneNumber: {
    type: String,
  },
  DateOfBirth: {
    type: Date,
  },
  Address: {
    type: String,
  },
  Image: {
    type: String,
  },
  Role: {
    type: String,
    enum: ['Admin', 'Driver','Customer'],
    default: "Customer"
  },
  Order: [{
    type: mongoose.Types.ObjectId,
    ref: 'Order',
  }],
  CardDetails: {
    type: mongoose.Types.ObjectId,
    ref: 'Card',
  },
  WishList: [{
    type: mongoose.Types.ObjectId,
    ref: 'Item',
  }]
},
  {
    timestamps: true,
  });

userSchema.pre('save', async function(next) {
  this.Password = await argon2.hash(this.Password);
  next();
})
userSchema.pre('updateOne', async function (next) {
  this.getUpdate().Password = await argon2.hash(this.getUpdate().Password); 
  next();
})


const User = mongoose.model("User", userSchema);
module.exports = User;
