const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxLength: 50,
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxLength: 100,
    },
    status: {
        type: String,
        enum: ['Interview', 'Pending', 'Declined'],
        default: 'Pending',
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide User']
    }
}, { timestamps: true})

module.exports = mongoose.model('Job', JobSchema)