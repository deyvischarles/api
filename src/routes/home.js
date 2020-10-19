const express = require('express')

const route = express.Router()

route.get('/', async (req, res) => {
	res.send({
		message: 'Bem-vindo(a) a Api Xmachine (by Deyvis Charles)'
	})
})

module.exports = app => app.use('/', route)
