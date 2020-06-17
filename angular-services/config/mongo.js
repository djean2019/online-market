/**
 * @author Darphe HYPPOLITE JEAN
 * Establish database connection
 * */
const mongoose = require('mongoose');
// const config = require('../config/properties');

/**
 * Database Connection
 */
const initializeDb = function (callback) {
    // mongoose.connect(config.dbConnectionHost+config.dbName,{useNewUrlParser:true,useUnifiedTopology: true},() => {
        mongoose.connect('mongodb://localhost:27017/online-market-db', {useNewUrlParser:true, useUnifiedTopology: true},() => {
            callback()
        })
    .catch((err)=>console.error(`${err}`))
}

module.exports = initializeDb;