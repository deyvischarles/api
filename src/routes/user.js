const express = require('express')
const verify = require('../helpers/verify')
const token = require('../helpers/token')
const User = require('../models/user')
const middleware = require('../middlewares/auth')

const route = express.Router()

route.use(middleware)

route.post('/add', async (req, res) => {
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

route.get('/', async (req, res) => {
	const users = await User.find({}).then((users) => {
		if (users) {
			res.send({
				users: users,
				user: req.userId
			})
		} else {
			res.status(400).send({
				message: 'Não existe usuários cadastrados ainda!'
			})
		}
	}).catch((err) => {
		res.status(400).send({
			message: 'Erro ao procurar usuários, tente novamente mais tarde!',
			debug: err
		})
	})
})

route.get('/:id', async (req, res) => {
	const user = await User.findOne({_id: req.params.id}).then((user) => {
		if (user) {
			res.send(user)
		} else {
			res.status(400).send({
				message: 'Usuário não encontrado!'
			})
		}
	}).catch((err) => {
		res.status(400).send({
			message: 'Erro ao pesquisar usuário, tente novamente mais tarde!',
			debug: err
		})
	})
})

route.put('/:id', async (req, res) => {
	if (! await User.findOne({_id: req.params.id})) {
		res.status(400).send({
			message: "Usuário não encontrado!"
		})
	} else if (req.userId != req.params.id) {
		res.send({
			message: "Tentativa Negada!"
		})
	} else if (verify.isEmpyt(req.body.name)) {
		res.status(400).send({
			message: "O campo nome está vazio!"
		})
	} else if (verify.notName(req.body.name)) {
		res.status(400).send({
			message: "Informe um nome válido!"
		})
	} else if (verify.isSqlInjection(req.body.bio)) {
		res.status(400).send({
			message: "Alguns caracters não são permitidos!"
		})
	} else {
		const userUpdate = await User.updateOne({_id: req.params.id}, req.body).then((userUpdate) => {
			if (userUpdate) {
				res.send({
					message: 'Usuário atualizado com sucesso!'
				})
			} else {
				res.status(400).send({
					message: 'Não foi possível atualizar usuário!',
					info: userUpdate
				})
			}
		}).catch((err) => {
			res.status(400).send({
				message: 'Erro ao atualizar usuário, tente novamente mais tarde!',
				debug: err
			})
		})
	}
})

route.put('/:id/email', async (req, res) => {
	if (! await User.findOne({_id: req.params.id})) {
		res.status(400).send({
			message: "Usuário não encontrado!"
		})
	} else if (verify.isEmpyt(req.body.email)) {
		res.status(400).send({
			message: "O campo email está vazio!"
		})
	} else if (verify.notEmail(req.body.email)) {
		res.status(400).send({
			message: "Informe um email válido!"
		})
	} else if (await User.findOne({email: req.body.email})) {
		res.status(400).send({
			message: "Este email não está mais disponivél!"
		})
	} else {
		const userUpdate = await User.updateOne({_id: req.params.id}, req.body).then((userUpdate) => {
			if (userUpdate) {
				res.send({
					message: 'Email atualizado com sucesso!'
				})
			} else {
				res.status(400).send({
					message: 'Não foi possível atualizar o email!',
					info: userUpdate
				})
			}
		}).catch((err) => {
			res.status(400).send({
				message: 'Erro ao atualizar email, tente novamente mais tarde!',
				debug: err
			})
		})
	}
})

route.put('/:id/security', async (req, res) => {
	if (! await User.findOne({_id: req.params.id})) {
		res.status(400).send({
			message: "Usuário não encontrado!"
		})
	} else if (verify.isEmpyt(req.body.password)) {
		res.status(400).send({
			message: "O campo senha está vazio!"
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
		const userUpdate = await User.updateOne({_id: req.params.id}, req.body).then((userUpdate) => {
			if (userUpdate) {
				res.send({
					message: 'Senha atualizada com sucesso!'
				})
			} else {
				res.status(400).send({
					message: 'Não foi possível atualizar a senha!',
					info: userUpdate
				})
			}
		}).catch((err) => {
			res.status(400).send({
				message: 'Erro ao atualizar senha, tente novamente mais tarde!',
				debug: err
			})
		})
	}
})

route.delete('/:id', async (req, res) => {
	if (! await User.findOne({_id: req.params.id})) {
		res.status(400).send({
			message: 'Usuário não encontrado!'
		})
	} else {
		const user = await User.findOne({_id: req.userId}).select('+level')

		if (user.level >= 3) {
			const userDelete = await User.deleteOne({_id: req.params.id}).then((userDelete) => {
				if (userDelete) {
					res.send({
						message: 'Usuário apagado com sucesso!'
					})
				} else {
					res.status(400).send({
						message: 'Não foi possível pagar este usuário!',
						info: userDelete
					})
				}
			}).catch((err) => {
				res.status(400).send({
					message: 'Erro ao apagar usuário, tente novamente mais tarde!',
					debug: err
				})
			})
		} else {
			res.status(400).send({
				message: 'Ação não autorizada!'
			})
		}
	}
})

module.exports = app => app.use('/user', route)