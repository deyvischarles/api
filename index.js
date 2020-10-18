const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors())

// Home
const home = require('./src/routes/home')(app)
// Authenticate
const security = require('./src/routes/security')(app)
// Blog
const blog = require('./src/routes/blog')(app)
// User
const user = require('./src/routes/user')(app)
// 404
app.use((req, res, next) => {
	res.status(404).send({
		title: '404',
		message: 'Página não encontrada!'
	})
})

app.listen(8000)