/**
 * User Model
 */

const mongoose = require("mongoose");
const bcrypt = require("../util/bcrypt");

const user = {
  username: {
    type: String,
    required: true,
    validate: {
      validator: (username) => {
        return username.length >= 5;
      },
      message: (props) => `${props.value} Validation failed`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: (props) => `${props.value} Validation failed`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  cart: [],
  // 'cart':{
  //     'productId': {
  //         type: mongoose.Schema.Types.ObjectId, ref: 'product'
  //     },
  //     'price': Number,
  //     'quantity': Number
  // },
  role: {
    type: String,
    default: "BUYER",
  },
  isApprouved: {
    type: Boolean,
    default: false,
  },
  address: [
    {
      billing: {
        street: {
          type: String,
          default: "...",
        },
        state: {
          type: String,
          default: "...",
        },
        zip: {
          type: String,
          default: "...",
        },
      },
      shipping: {
        street: {
          type: String,
          default:"..."
        },
        state: {
          type: String,
          default:"..."
        },
        zip: {
          type: String,
          default:"..."
        },
      },
    }]
} // after commit

const userSchema = new mongoose.Schema(user);
const userModel = mongoose.model("user", userSchema);

const userDomain = {
  userSchema: userSchema,
  userModel: userModel,
};

// userSchema.pre("create", function (next) {
//   const user = this;
//   if (user.password === undefined) {
//     return next();
//   }
//   user.password = bcrypt.encodeSync(user.password);
// });

module.exports = userDomain;
