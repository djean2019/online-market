/** 
 * @author Darphe HYPPOLITE JEAN
 *
 * App Utilities
 */
const AdminModel = require('../model/admin').adminModel
const ProductModel = require('../model/product').productModel
const UserModel = require('../model/user').userModel
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
    populateUsers: function (onComplete) {
        let user1 = new UserModel({ fullname: 'Joanne H. J.', email: 'joanne@onlinemarket.com', password: bcrypt.encodeSync('1234'), role:'SELLER' });
        let user2 = new UserModel({ fullname: 'Caleb H. J.', email: 'caleb@onlinemarket.com', password: bcrypt.encodeSync('1234'), role:'SELLER' });
        let user3 = new UserModel({ fullname: 'Benssy H. J.', email: 'benssy@onlinemarket.com', password: bcrypt.encodeSync('1234'), role:'SELLER' });
        let user4 = new UserModel({ fullname: 'Blanco T.', email: 'blanco@onlinemarket.com', password: bcrypt.encodeSync('1234'), role:'SELLER' });
        let users =[];
        users.push(user1,user2,user3,user4);
        for(let user of users){
            UserModel.exists({ email: user.email })
                .then(res => {
                    if (res) {
                        onComplete(`user with ${user.email} Already available ${Date.now()}`)
                    } else {
                        user.save()
                        onComplete(`user with ${user.email} created - ${Date.now()}`)
                    }
                }).catch(err => onComplete(`user with ${user.email} failed to create`));
        }
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