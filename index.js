// implement your API here
const express = require("express");

const db = require('./data/db')

const cors = require('cors')

const server = express();

server.use(express.json(), cors())
const PORT = 4040;




server.get('/api/users/', (req, res) => {
 db.find()
   .then((users) => {
    res
     .json(users)
   })
   .catch(err => {
    res
     .status(500)
     .json({error: "The users information could not be retrieved."})
   })

})

server.get('/api/users/:id/', (req, res) => {
 // console.log("Request:", req.params.id)
 // console.log("Response:", res)
 const { id } = req.params;
 db.findById(id)
   .then(user => {
    if (user) {
     res.json(user)
    }
    else {
     res
      .status(404)
      .json({error: 'The user with the specified ID does not exist.'})
    }
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "The user information could not be retrieved."})
   })
})


server.post('/api/users/', (req, res) => {
 const { name, bio } = req.body
 db.insert({name, bio})
   .then((user) => {
    if (name, bio) {
     res
      .status(201)
      .json(user)
      .send(response)
    }
    else {
     res
      .status(400)
      .json({errorMessage: "Please provide name and bio for the user"})
    }
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error while saving the user to the database."})
   })
})

server.delete('/api/users/:id/', (req, res) => {
 const { id, user } = req.params
 db.remove(id)
   .then(() => {
    if (id){
    res
     .status(200)
     .send({message: "User was removed from the database."})
    }
    else {
    if (!id){
    res
     .status(404)
     .json({message: "The user with the specified ID does not exist."})
    }
   }})
   .catch(() => {
    res
     .status(500)
     .json({error: "The user could not be removed."})
  })
})  



 


server.put('/api/users/:id', (req, res) => {
 console.log("Request for Id:", req.params.id)
 console.log("Request for body:", req.body)
 const user = req.body
 const { id } = req.params
 if (user.name && user.bio){
  console.log("Success zero.")  
  
  db
   .update(id, user)
   .then(count => {
    console.log("Success one.")
    if (count){
     db.findById(id)
       .then(user => {
        console.log("Success two.")
        res
         .json(user)
       })
    }
    else {
     res
      .status(404)
      .json({message: "The user with the specified ID does not exist."})
    }
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "The user information could not be modified."})
   })
 }
})

server.listen(PORT, () => {
 console.log(`Server running live on ${PORT}`)
}); 