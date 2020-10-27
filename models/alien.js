const mongoose = require('mongoose')


const alienSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    tech:{
        type: String,
        required: true
    },
    sub:{
        type: Boolean,
        required: true,
        default: false
    },
    
    houses: [{
        type: String
    }]
})

module.exports = mongoose.model('Alien',alienSchema)