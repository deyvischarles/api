/* Customer | Last features: 26/07/20
======================================================================= */
const mongoose = require('../database/mongodb')

const CustomerSchema = new mongoose.Schema({
	author: mongoose.ObjectId,
    name :{
        type: String,
        required: true
    },
    thumb: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        default: ''
    },
    whatsapp: {
        type: String,
        default: ''
    },
    cpf: {
        type: String,
        required: true
    },
    niver: {
        day: {
            type: Number,
            require:true,
            default: ''
        },
        month: {
            type: Number,
            require:true,
            default: ''
        },
        year: {
            type: Number,
            require:true,
            default: ''
        }
    },
    address: {
        andress: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        bairro: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        cep: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        }
    }
},
{
	timestamps: true
})

module.exports = mongoose.model('Customer', CustomerSchema)
