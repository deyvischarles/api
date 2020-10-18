const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
	res.status(200).send({
		message: "Todos Produtos"
	})
})

router.post("/", (req, res, next) => {

	const product = {
		name: req.body.name,
		price: req.body.price
	}

	res.status(201).send({
		message: "Produtos criados",
		registeredProduct: product
	})
})

router.get("/:id_product", (req, res, next) => {
	const id = req.params.id_product
	
	res.status(200).send({
		message: "Detalhes do Produto (?)",
		id: id
	})
})

router.patch("/", (req, res, next) => {
	res.status(201).send({
		message: "Produto atualizado"
	})
})

router.delete("/", (req, res, next) => {
	res.status(201).send({
		message: "Produto apagado"
	})
})

module.exports = router
