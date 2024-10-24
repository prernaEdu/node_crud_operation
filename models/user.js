const mongo = require('mongoose');
const userSchema = new mongo.Schema({
    name: String,
    id: String,
    email: { type: String, unique: true },
    mobileNumber: { type: Number }
});

const User = mongo.model('user', userSchema, 'user');

module.exports = User;