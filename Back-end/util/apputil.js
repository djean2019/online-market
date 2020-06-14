/** 
 * @author Darphe HYPPOLITE JEAN
 *
 * App Utilities
 */
const AdminModel = require('../model/admin').adminModel
const ProductModel = require('../model/product').productModel
const bcrypt = require('../util/bcrypt')

module.exports = {
    populateAdmin: function (onComplete) {
        let admin = new AdminModel({ fullname: 'Darphe H. J.', email: 'darphe@onlinemarket.com', password: bcrypt.encodeSync('1234567') })
        AdminModel.exists({ email: admin.email })
            .then(res => {
                if (res) {
                    onComplete(`admin Already available ${Date.now()}`)
                } else {
                    admin.save()
                    onComplete(`admin created - ${Date.now()}`)
                }
            }).catch(err => onComplete(`admin failed to create`))
    },
    populateProduct: function (onComplete) {
        let product = new ProductModel({ name: 'Book', price: 30, imageUrl: 'darphe@onlinemarket.com', description: 'description' })
        ProductModel.exists({ name: product.name })
            .then(res => {
                if (res) {
                    onComplete(`product Already available ${Date.now()}`)
                } else {
                    product.save()
                    onComplete(`product created - ${Date.now()}`)
                }
            }).catch(err => onComplete(`product failed to create`))
    }
}