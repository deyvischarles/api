const jwt = require('jsonwebtoken')
const hash = require('../config/hash.json')

module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
    
    const header = req.headers.authorization

    if (!header) {
        res.status(401).send({message: 'Nenhum Token encontrado!'})
    } else {
        const parts = header.split(' ')

        if (!parts.length === 2) {
            res.status(401).send({message: 'Token mau formatado!'})
        } else {
            const [ scheme, token ] = parts
    
            if (!/^Bearer$/i.test(scheme)) {
                res.status(401).send({message: 'Token desconhecido!'})
            } else {
                jwt.verify(token, hash.secret, (err, decoded) => {
                    if (err) {
                        res.status(401).send({ message: 'Token inválido!'})
                    } else {
                        req.userId = decoded.id
                        return next()
                    }
                })
            }
        }
    }
}