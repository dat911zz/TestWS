const express = require('express');
const app = express();
app.use(express.json());

var petList = [
  {
    "id": 1,
    "type": "dog",
    "price": 249.99
  },
  {
    "id": 2,
    "type": "cat",
    "price": 124.99
  },
  {
    "id": 3,
    "type": "fish",
    "price": 0.99
  }
]

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Get all pet
app.get("/pets", (req, res, next) => {
  res.json(petList);
});
// Get a specific pet by ID
app.get('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pet = petList.find((p) => p.id === id);

  if (!pet) {
    res.status(404).json({ message: `Pet with ID ${id} not found` });
  } else {
    res.json(pet);
  }
});

// Create a new pet in the petList
app.post('/pets', (req, res) => {
  try {
    const newPet = {
      id: petList.length + 1,
      type: req.body.type,
      price: req.body.price,
    };
    petList.push(newPet);
    res.status(201).json(newPet);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error: ' + err + ' || ' + req.body);
  }
});
// Update an existing pet by ID
app.put('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const petIndex = petList.findIndex((p) => p.id === id);

  if (petIndex === -1) {
    res.status(404).json({ message: `Pet with ID ${id} not found` });
  } else {
    const { type, price } = req.body;
    const pet = { id, type, price };
    petList[petIndex] = pet;
    res.json(pet);
  }
});
// Delete a pet by ID
app.delete('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const petIndex = petList.findIndex((p) => p.id === id);

  if (petIndex === -1) {
    res.status(404).json({ message: `Pet with ID ${id} not found` });
  } else {
    petList.splice(petIndex, 1);
    res.status(204).json({ message: 'Pet with ID ${id} has successfully deleted!'});
  }
});

var server = app.listen(3000, function () {
  console.log('Listening on port %d', server.address().port);
});
module.exports = app;