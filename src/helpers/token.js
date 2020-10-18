const hash = require('../config/hash.json')
const jwt = require('jsonwebtoken')

const token = function() {
    return {
        generate: (params = {}) =>
        {
            return jwt.sign(params, hash.secret, {
                expiresIn: 86400
            })
        }
    }
}

module.exports = new token