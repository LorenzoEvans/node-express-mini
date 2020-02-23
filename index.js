const cors = require('cors')
const db = require('./data/db');
const express = require('express');
const server = express();

server.use(express.json(), cors());



// The above is an instance of an express application,
// that we can use to configure our server.

// server.get('/', (req, res) => {
//   res.send('Hello world');
// });

// server.get('/hobbits', (req, res) => {
//   const hobbits =[{id: 1, name: "Samwise Gamgee"},
//                   {id: 2, name:  "Frodo Baggins"}]
//   res.status(200).json(hobbits);
// });

// server.get('/users', (req, res) => {
//   const users = db.find();
//   res.status(200).send(users);
// })


server.get('/api/users', (req, res) => {
  db.find()
    .then((users) => {
      res.json(users);
    })
    .catch(err => {
      res.status(500)
         .json({error: err.message, error_message: "The users information is not available." })
    })
});

server.get('/api/users/:id/', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      }
      else {
        res.status(404)
           .json({error: "This user is not in the database."})
      }
    })
    .catch((err) => {
      res.status(500)
         .json({error_message: "The user information could not be retrieved"})
    })
})
server.post('ap');
server.put();
server.delete();


server.listen(8000, () => console.log('Server live on 8k.'));

