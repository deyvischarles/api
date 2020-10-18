import Router from 'express'
const route = Router()

route.get((req, res, next) => {
	res.status(404).send({
		message: '404 Página não encontrada!'
	})
})

export default route
