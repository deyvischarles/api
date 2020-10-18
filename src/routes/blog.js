const express = require('express')
const verify = require('../helpers/verify')
const Post = require('../models/post')
const middleware = require('../middlewares/auth')

const route = express.Router()

route.get('/', async (req, res) => {
	const posts = await Post.find({}).then((posts) => {
		if (posts) {
			res.send(posts)
		} else {
			res.status(400).send({
				message: 'Não existe artigos cadastrados ainda!'
			})
		}
	}).catch((err) => {
		res.status(400).send({
			message: 'Erro ao pesquisar por artigos, tente novamente mais tarde!',
			debug: err
		})
	})
})

route.get('/:id', async (req, res) => {
	const post = await Post.findOne({_id:req.params.id}).then((post) => {
		if (post) {
			res.send(post)
		} else {
			res.status(400).send({
				message: 'Nenhum artigo encontrado!'
			})
		}
	}).catch((err) => {
		res.status(400).send({
			message: 'Erro ao pesquisar artigo, tente novamente mais tarde!',
			debug: err
		})
	})
})

route.use(middleware)

route.post('/', async (req, res) => {

	if (verify.isEmpyt(req.body.title)) {
		res.status(400).send({
			message: 'O campo de titulo está vázio!'
		})
	} else if (verify.minLength(req.body.title, 15)) {
		res.status(400).send({
			message: 'Título muito curto!'
		})
	} else if (verify.isEmpyt(req.body.content)) {
		res.status(400).send({
			message: 'O campo de conteúdo está vázio!'
		})
	} else if (verify.minLength(req.body.content, 20)) {
		res.status(400).send({
			message: 'Conteúdo muito curto!'
		})
	} else {
		const newPost = await Post.create(req.body).then((newPost) => {
			if (newPost) {
				res.send({
					message: 'Artigo cadastrado com sucesso!'
				})
			} else {
				res.status(400).send({
					message: 'Não foi possivél cadastrar o artigo!',
					debug: newPost
				})
			}
		}).catch((err) => {
			res.status(400).send({
				message: 'Erro ao cadastrar artigo, tente novamente mais tarde!',
				debug: err
			})
		})
	}
})

route.put('/:id', async (req, res) => {
	if (verify.isEmpyt(req.body.title)) {
		res.status(400).send({
			message: 'O campo de titulo está vázio!'
		})
	} else if (verify.minLength(req.body.title, 15)) {
		res.status(400).send({
			message: 'Título muito curto!'
		})
	} else if (verify.isEmpyt(req.body.content)) {
		res.status(400).send({
			message: 'O campo de conteúdo está vázio!'
		})
	} else if (verify.minLength(req.body.content, 20)) {
		res.status(400).send({
			message: 'Conteúdo muito curto!'
		})
	} else {
		const postUpdate = await Post.updateOne({_id: req.params.id}, req.body).then((postUpdate) => {
			if (postUpdate) {
				res.send({
					message: 'Artigo atualizado com sucesso!'
				})
			} else {
				res.status(400).send({
					message: 'Não foi possivél atualizar o artigo!',
					debug: postUpdate
				})
			}
		}).catch((err) => {
			res.status(400).send({
				message: 'Erro ao atualizar artigo, tente novamente mais tarde!',
				debug: err
			})
		})
	}
})

route.delete('/:id', async (req, res) => {
	if (!await Post.findOne({_id: req.params.id})) {
		res.status(400).send({
			message: 'Artigo não esncontrado!'
		})
	} else {
		const postDelete = await Post.deleteOne({_id: req.params.id}).then((postDelete) => {
			if (postDelete) {
				res.send({
					message: 'Artigo apagado com sucesso!'
				})
			} else {
				res.status(400).send({
					message: 'Não foi possivél apagar este artigo!',
					debug: postDelete
				})
			}
		}).catch((err) => {
			res.status(400).send({
				message: 'Erro ao apagar artigo, tente novamente mais tarde!',
				debug: err
			})
		})
	}
})

module.exports = app => app.use('/blog', route)
