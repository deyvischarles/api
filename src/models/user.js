/* User | Last features: 26/07/20
======================================================================= */
const mongoose = require('../database/mongodb')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    nick: {
        type: String,
        unique: true
    },
    bio: {
        type: String
    },
    level: {
        type: Number,
        select: false
    }
},
{
	timestamps: true
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

UserSchema.pre('update', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    // this.set({ password: hash })

    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User