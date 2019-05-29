var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var fs = require('fs');
app.use(bodyParse.json());

var port = process.env.PORT || 8000;


app.get('/hello', (req, res) => {
  res.send("Hello");
});

app.post('/create/:name', (req, res) => {
  let obj = {
    id: 1,
    name: req.params.name
  }
  res.json(obj);
})

app.get('/', (req, res) => {
  let index = fs.readFileSync("./part1/index.html", "utf8")
  res.send(index)
})


app.get("/verify/:age", (req, res) => {
  let age = parseInt(req.params.age);
  if (age > 13) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);

  }
  res.send(req.body.good);
});


app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(port, function () {
  console.log('Listening on port', port);
});


