const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
	res.status(200).send({
		message: "Todos Pedidos"
	})
})

router.post("/", (req, res, next) => {

	const orders = {
		productId: req.body.productId,
		amount: req.body.amount
	}

	res.status(201).send({
		message: "Pedidos criados",
		registeredOrders: orders
	})
})

router.get("/:id_product", (req, res, next) => {
	const id = req.params.id_product
	
	res.status(200).send({
		message: "Detalhes do Pedido (?)",
		id: id
	})
})

router.patch("/", (req, res, next) => {
	res.status(201).send({
		message: "Pedito atualizado"
	})
})

router.delete("/", (req, res, next) => {
	res.status(201).send({
		message: "Pedido apagado"
	})
})

module.exports = router
