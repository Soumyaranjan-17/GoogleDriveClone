const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim:true,
        lowercase:true,
        unique: true,
        minlength: [3, 'Username must be atleast 3 characters long']
    },

    email:{
        type: String,
        required: true,
        trim:true,
        lowercase:true,
        unique: true,
        minlength: [10, 'Email must be atleast 10 characters long']
    },

    password:{
        type: String,
        required: true,
        trim:true,
        minlength: [6, 'Password must be atleast 6 characters long']
    }
})

const user = mongoose.model('user', userSchema);
module.exports = user;