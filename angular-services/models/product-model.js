/**
 * Product Model
 */

const mongoose = require('mongoose')

const product = {
    'name':{
        type: String,
        required: true,
        validate: {
            validator: (name) =>{
                return (name.length >= 4);
              },
            message: props => `${props.value} Validation failed`
        }
    },
    'imageUrl': {
        type: String,
        required: true
    },
    'price': {
        type: Number,
        required: true,
    },
    'description': {
        type: String,
        required: true
    },
    'createdDate':{
        type: Date,
        default: Date.now
    },
    'userId': {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}

const productSchema = new mongoose.Schema(product);
const productModel = mongoose.model('product',productSchema);

const productDomain = {
    'productSchema': productSchema,
    'productModel': productModel
}

module.exports = productDomain;