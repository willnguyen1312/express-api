// Call the packages we need
const express = require('express')

const app = express()
const bodyParser = require('body-parser')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 8080

// ROUTES FOR OUR API
const router = express.Router()

// test route to make sure everything is working
router.get('/', (req, res) => {
  res.json({
    message: 'hooray! welcome to our api!',
  })
})

// more routes will happen later

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router)


// Start the server
app.listen(port)

// eslint-disable-next-line
console.log(`Magic happens on port ${port}`)
