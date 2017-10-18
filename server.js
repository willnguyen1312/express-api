// Call the packages we need
const express = require('express')
const mongoose = require('mongoose')
const Bear = require('./app/models/bear')

mongoose.connect('mongodb://localhost/test', { useMongoClient: true }) // connect to our database
mongoose.Promise = global.Promise

const app = express()
const bodyParser = require('body-parser')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 8080

// ROUTES FOR OUR API
const router = express.Router()

// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  console.log('Something is happening.')
  next() // make sure we go to the next routes and don't stop here
})

// test route to make sure everything is working
router.get('/', (req, res) => {
  res.json({
    message: 'hooray! welcome to our api!',
  })
})

// on routes that end in /bears
router.route('/bears')
  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post((req, res) => {
    const bear = new Bear()
    bear.name = req.body.name

    // save the bear and check for errors
    bear.save((err) => {
      if (err) {
        res.send(err)
      }

      res.json({
        message: 'Bear created!',
      })
    })
  })

  // get all the bears (cessed at GET http://localhost:8080/api/bears)
  .get((req, res) => {
    Bear.find((err, bears) => {
      if (err) {
        res.send(err)
      }

      res.json(bears)
    })
  })

// on routes that end in /bears/:bear_id
router.route('/bears/:bear_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get((req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
      if (err) {
        res.send(err)
      }
      res.json(bear)
    })
  })

  // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
  .put((req, res) => {
    // use our bear model to find the bear we want
    Bear.findByIdAndUpdate(req.params.bear_id, { $set: req.body }, (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(`RESULT: ${result}`)
      res.json({
        message: 'Done Updated',
      })
    })
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
  // eslint-disable-next-line
  .delete((req, res) => {
    Bear.findByIdAndRemove({
      _id: req.params.bear_id,
    }, (err, bear) => {
      if (err) {
        res.send(err)
      }
      console.log(bear)
      res.json({
        message: 'Successfully delted',
      })
    })
    console.log(req.params.bear_id)
  })

// more routes will happen later

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router)


// Start the server
app.listen(port)

console.log(`Magic happens on port ${port}`)
