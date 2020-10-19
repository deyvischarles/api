const jwt = require('jsonwebtoken')
const hash = process.env.SECRET_KEY

const token = function() {
    return {
        generate: (params = {}) =>
        {
            return jwt.sign(params, hash, {
                expiresIn: 86400
            })
        }
    }
}

module.exports = new token