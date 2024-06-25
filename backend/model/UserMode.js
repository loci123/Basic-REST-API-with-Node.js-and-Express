const mongoose = require('mongoose');

const goalsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Goal', goalsSchema);
