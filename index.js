const express = require('express');
const app = express();
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
app.get("/pets", (req, res, next) => {
  res.json(petList);
});
app.get("/pets/:id", (req, res, next) => {
  res.json(petList[req.params.id]);
});


module.exports = app;