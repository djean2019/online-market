/**
 * @author Darphe HYPPOLITE JEAN
 *
 * App Utilities
 */
const ProductModel = require('../models/product-model').productModel
const UserModel = require('../models/user-model').userModel
const bcrypt = require('../util/bcrypt');
const mongoose = require('mongoose');

module.exports = {
    populateUsers: function (onComplete) {
        let admin = new UserModel({ "_id":mongoose.Types.ObjectId("5eeb587c2d00fe19cf34b4d1"),fullname: 'Darphe H. J.', email: 'darphe@onlinemarket.com', password: bcrypt.encodeSync('1234567'), role:'ADMIN' })
        let user1 = new UserModel({ "_id":mongoose.Types.ObjectId("5eeb587c2d00fe19cf34b4d2"),fullname: 'Joanne H. J.', email: 'joanne@onlinemarket.com', password: bcrypt.encodeSync('1234'), role:'SELLER' });
        let user2 = new UserModel({ "_id":mongoose.Types.ObjectId("5eeb587c2d00fe19cf34b4d3"),fullname: 'Longxiang X.', email: 'caleb@onlinemarket.com', password: bcrypt.encodeSync('1234'), role:'BUYER' });
        let user3 = new UserModel({ "_id":mongoose.Types.ObjectId("5eeb587c2d00fe19cf34b4d4"),fullname: 'Benssy H. J.', email: 'benssy@onlinemarket.com', password: bcrypt.encodeSync('1234'), role:'SELLER' });
        let user4 = new UserModel({ "_id":mongoose.Types.ObjectId("5eeb587c2d00fe19cf34b4d5"),fullname: 'Blanco T.', email: 'blanco@onlinemarket.com', password: bcrypt.encodeSync('1234'), role:'BUYER', 
        address:[
            {
                'billing':{
                    'street':"Fairfield",
                    'state':"IA",
                    'zip':"52557"
                },
                'shipping':{
                    'street':"Fairfield",
                    'state':"IA",
                    'zip':"52557"
                }
            }] });
        let users =[];
        users.push(admin,user1,user2,user3,user4);
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
        let pro1 = new ProductModel({ "_id":mongoose.Types.ObjectId("5eeb9315af3c3b2bca59ffa4"), name: 'Angular', price: 30, imageUrl: 'https://www.levelaccess.com/wp-content/uploads/2015/08/AngularJS_google.png', description: 'This is a nice book', userId:'5eeb587c2d00fe19cf34b4d2' })
        let pro2 = new ProductModel({ "_id":mongoose.Types.ObjectId("5eeb9315af3c3b2bca59ffa5"), name: 'Node Js', price: 70, imageUrl: 'https://i.imgur.com/RHBW5y1.png', description: 'Server side lessons', userId:'5eeb587c2d00fe19cf34b4d4' })
        let pro3 = new ProductModel({ "_id":mongoose.Types.ObjectId("5eeb9315af3c3b2bca59ffa6"), name: 'React Js', price: 50, imageUrl: 'https://www.valuecoders.com/common/images-2/reactjs-og.png', description: 'Nice reactive learning book',userId: '5eeb587c2d00fe19cf34b4d5' })
        let pro4 = new ProductModel({ "_id":mongoose.Types.ObjectId("5eeb9315af3c3b2bca59ffa7"), name: 'Spring', price: 100, imageUrl: 'https://miro.medium.com/max/550/1*47DZV2oA3VWB-AaZOIT73w.png', description: 'A better way to improve your app', userId: '5eeb587c2d00fe19cf34b4d2' })
        let products = [];
        products.push(pro1,pro2,pro3,pro4);
        for(let product of products){
            ProductModel.exists({ imageUrl: product.imageUrl })
                .then(res => {
                    if (res) {
                        onComplete(`product ${product.imageUrl} Already available ${Date.now()}`)
                    } else {
                        product.save()
                        onComplete(`product ${product.imageUrl} created - ${Date.now()}`)
                    }
                }).catch(err => onComplete(`product ${product.imageUrl} failed to create`))
        }
      })
      .catch((err) => onComplete(`admin failed to create`));
  },
  populateUsers: function (onComplete) {
    let admin = new UserModel({
      username: "Darphe H. J.",
      email: "darphe@onlinemarket.com",
      password: bcrypt.encodeSync("1234567"),
      role: "ADMIN",
    });
    let user1 = new UserModel({
      username: "Joanne H. J.",
      email: "joanne@onlinemarket.com",
      password: bcrypt.encodeSync("1234"),
      role: "SELLER",
    });
    let user2 = new UserModel({
      username: "Caleb H. J.",
      email: "caleb@onlinemarket.com",
      password: bcrypt.encodeSync("1234"),
      role: "BUYER",
    });
    let user3 = new UserModel({
      username: "Benssy H. J.",
      email: "benssy@onlinemarket.com",
      password: bcrypt.encodeSync("1234"),
      role: "SELLER",
    });
    let user4 = new UserModel({
      username: "Blanco T.",
      email: "blanco@onlinemarket.com",
      password: bcrypt.encodeSync("1234"),
      role: "SELLER",
    });
    let users = [];
    users.push(admin, user1, user2, user3, user4);
    for (let user of users) {
      UserModel.exists({ email: user.email })
        .then((res) => {
          if (res) {
            onComplete(
              `user with ${user.email} Already available ${Date.now()}`
            );
          } else {
            user.save();
            onComplete(`user with ${user.email} created - ${Date.now()}`);
          }
        })
        .catch((err) => onComplete(`user with ${user.email} failed to create`));
    }
  },
  populateProduct: function (onComplete) {
    let pro1 = new ProductModel({
      name: "Angular",
      price: 30,
      imageUrl:
        "https://www.levelaccess.com/wp-content/uploads/2015/08/AngularJS_google.png",
      description: "This is a nice book",
      userId: "5ee8106fde993aab21ebcc5d",
    });
    let pro2 = new ProductModel({
      name: "Node Js",
      price: 70,
      imageUrl: "https://i.imgur.com/RHBW5y1.png",
      description: "Server side lessons",
      userId: "5ee8106fde993aab21ebcc5f",
    });
    let pro3 = new ProductModel({
      name: "React Js",
      price: 50,
      imageUrl: "https://www.valuecoders.com/common/images-2/reactjs-og.png",
      description: "Nice reactive learning book",
      userId: "5ee8106fde993aab21ebcc5d",
    });
    let pro4 = new ProductModel({
      name: "Spring",
      price: 100,
      imageUrl: "https://miro.medium.com/max/550/1*47DZV2oA3VWB-AaZOIT73w.png",
      description: "A better way to improve your app",
      userId: "5ee8106fde993aab21ebcc60",
    });
    let products = [];
    products.push(pro1, pro2, pro3, pro4);
    for (let product of products) {
      ProductModel.exists({ imageUrl: product.imageUrl })
        .then((res) => {
          if (res) {
            onComplete(
              `product ${product.imageUrl} Already available ${Date.now()}`
            );
          } else {
            product.save();
            onComplete(`product ${product.imageUrl} created - ${Date.now()}`);
          }
        })
        .catch((err) =>
          onComplete(`product ${product.imageUrl} failed to create`)
        );
    }
  },
};
