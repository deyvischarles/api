/* Article | Last features: 26/07/20
======================================================================= */
const mongoose = require('../database/mongodb')

const PostSchema = new mongoose.Schema({
	author: mongoose.ObjectId,
	title: {
		type: String,
		require: true
	},
	content: {
		type: String,
		require: true
	}
},
{
	timestamps: true
})

module.exports = mongoose.model("Post", PostSchema)