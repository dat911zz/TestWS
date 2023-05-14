const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api", cors({ origin: '*' }), require("./router"));
// Page Error
app.get("*", (req, res) => {
  res.send("Resouce not found!")
});
var server = app.listen(3000, function () {
  console.log('Listening on port %d', server.address().port);
});
module.exports = app;