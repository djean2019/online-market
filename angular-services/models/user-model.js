/**
 * User Model
 */

const mongoose = require('mongoose')

const user = {
    'fullname':{
        type: String,
        required: true,
        validate: {
            validator: (fullname) =>{
                return (fullname.length >= 5);
              },
            message: props => `${props.value} Validation failed`
        }
    },
    'email': {
        type: String,
        required: true,
        validate: {
            validator: (email) =>{
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
              },
            message: props => `${props.value} Validation failed`
        }
    },
    'password': {
        type: String,
        required: true
    },
    'createdDate':{
        type: Date,
        default: Date.now
    },
    'cart':[],
    // 'cart':[{
    //     'productId': {
    //         type: mongoose.Schema.Types.ObjectId, ref: 'product'
    //     },
    //     'quantity': Number
    // }],
    'role': {
        type: String,
        default: 'BUYER'
    },
    // 'billaddress':{
    //     type: String,
    //     default:'...'
    // },
    //  'shipaddress':{
    //     type: String,
    //     default: '...'
    //  }
    'address':[
        {
            'billing':{
                'street':{
                    type: String,
                    default:'...'
                },
                'state':{
                    type: String,
                    default:'...'
                },
                'zip':{
                    type: String,
                    default:'...'
                }
            },
            'shipping':{
                'street':{
                    type: String,
                },
                'state':{
                    type: String,
                },
                'zip':{
                    type: String,
                }
            }
        }]
  
}

const userSchema = new mongoose.Schema(user);
const userModel = mongoose.model('user',userSchema);

const userDomain = {
    'userSchema': userSchema,
    'userModel': userModel
}

module.exports = userDomain;