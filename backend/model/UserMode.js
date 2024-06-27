const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, 
{
    timestamps: true // Correct the option to lowercase 'timestamps'
})

module.exports = mongoose.model('User', UserSchema)
