const mongoose = require('mongoose')

const { Schema } = mongoose

const BearSchema = new Schema({
  name: String,
})

module.exports = mongoose.model('Bear', BearSchema)
