const mongoose = require('mongoose');
const {DB_QUERYSTRING} = require('./env.js');
console.log(DB_QUERYSTRING)
exports.dbInit = () =>  mongoose.connect(DB_QUERYSTRING);
