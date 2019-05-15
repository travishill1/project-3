const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

// instanceLocator and Secret Key here are copied from a pusher.com/chatkit instance from an account linked with my github profile
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:62c10789-c012-4aa0-b6c7-a824e4374773',
  key: '97625b2f-a1ca-4f8b-94fa-9bee769fe4f2:C5el6IfBd38tNGRNQh5d4LP+6lqYeXYENahfd1LC1Xc=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body

  chatkit.createUser({
    name: username,
    id: username
  })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.statusCode).json(error)
      }
    })
})

// old way to auth (YT video)
// app.post('/authenticate', (req, res) => {
//   const { grant_type } = req.body
//   res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id }
//   ))
// })

// new way to auth (docs)
app.post('/auth', (req, res) => { 
  const authData = chatkit.authenticate({ 
    userId: req.query.user_id 
  }); 
 
  res.status(authData.status) 
     .set(authData.headers) 
     .send(authData.body); 
}) 

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
