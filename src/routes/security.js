const express = require('express')
const bcrypt = require('bcrypt')
const verify = require('../helpers/verify')
const token = require('../helpers/token')
const User = require('../models/user')

const route = express.Router()

route.get('/authenticate', async (req, res) => {
	res.send({
		message: 'Loge-se para acessar'
	})
})

route.post('/register', async (req, res) => {
	if (verify.isEmpyt(req.body.name)) {
		res.status(400).send({
			message: "O campo de nome está vazio!"
		})
	} else if (verify.notName(req.body.name)) {
		res.status(400).send({
			message: "Informe um nome válido!"
		})
	} else if (verify.isEmpyt(req.body.email)) {
		res.status(400).send({
			message: "O campo de email está vazio!"
		})
	} else if (verify.notEmail(req.body.email)) {
		res.status(400).send({
			message: "Informe um email válido!"
		})
	} else if (await User.findOne({email: req.body.email})) {
		res.status(400).send({
			message: "Este email já existe!"
		})
	} else if (verify.isEmpyt(req.body.password)) {
		res.status(400).send({
			message: "O campo de senha está vazio!"
		})
	} else if (verify.minLength(req.body.password, 8)) {
		res.status(400).send({
			message: "Senha muito curta!"
		})
	} else if (verify.notSecurity(req.body.password)) {
		res.status(400).send({
			message: "Senha muito Fraca!",
			dicas: "Acrescente letras maiúculas, números, símbolos, e ou espaços vazios. Minimo 8 caracters"
		})
	} else {
		const newUser = await User.create(req.body).then((newUser) => {
			newUser.password = undefined

			if (newUser) {
				res.send({
					message: 'Usuário cadastrado com sucesso!',
					user: newUser,
					token: token.generate({id: newUser.id})
				})
			} else {
				res.status(400).send({
					message: 'Não foi possível cadastrar-se!',
					debug: newUser
				})
			}
		}).catch((err) => {
			res.status(400).send({
				message: 'Erro ao cadastrar-se, tente novamente mais tarde!',
				debug: err
			})
		})
	}
})

route.post('/authenticate', async (req, res) => {
	const { email, password } = req.body
	
	const user = await User.findOne({email}).select('+password')

	if (verify.isEmpyt(req.body.email)) {
		res.status(400).send({
			message: "O campo de email está vazio!"
		})
	} else if (verify.isEmpyt(req.body.password)) {
		res.status(400).send({
			message: "O campo de senha está vazio!"
		})
	} else if (!user) {
		res.status(400).send({
			message: 'Email ou senha incorreto!'
		})
	} else if (!await bcrypt.compare(password, user.password)) {
		res.status(400).send({
			message: 'Senha incorreta!'
		})
	} else {
		user.password = undefined

		res.send({
			message: 'Autorizado!',
			user: user,
			token: token.generate({id: user.id})
		})
	}
})

module.exports = app => app.use('/security', route)