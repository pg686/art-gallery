const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const {SECRET} = require('../config/env.js');
const jwt = require('jsonwebtoken');


exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
    const user = await User.findOne({username: username});
    if(!user){
        throw {
            massage: 'Cannot find username or password!'
        }
    }
const isValid = await bcrypt.compare(password, user.password);
if(!isValid){
    throw {
        massage: 'Cannot find username or password!'
    }
}

return user;
}

exports.createToken = (user) => {
    const payload = {_id: user._id, username: user.username, address: user.address};
return new Promise((resolve, reject) => {
jwt.sign(payload, SECRET, {expiresIn: '2d'}, (err, decodedToken) => {
    if(err){
        return reject(err);
    }
    resolve(decodedToken);
})
})
}