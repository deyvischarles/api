const express = require('express')

const route = express.Router()

route.get('/', async (req, res) => {
	res.send({
		message: 'Bem-vindo(a) a Api da Supermachine'
	})
})

module.exports = app => app.use('/', route)
