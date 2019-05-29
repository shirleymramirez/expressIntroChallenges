var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var fs = require('fs');
app.use(bodyParse.json());

var port = process.env.PORT || 8000;

app.post('/create/:name/:age', (req, res) => {
  let storage = fs.readFileSync(__dirname + '/storage.json', 'utf8');
  let data = JSON.parse(storage);
  let user = {
    name: req.params.name,
    age: req.params.age
  }
  data.push(user);
  console.log(data);
  fs.writeFileSync(__dirname + '/storage.json', JSON.stringify(data));
  res.send(data);

})

app.get('/', (req, res) => {
  let data = fs.readFileSync('/storage.json', 'utf8')
  console.log(data);
  res.send(data);
})


app.get('/:name', (req, res) => {
  let firstObj = JSON.parse(fs.readFileSync('/part2/storage.json', 'utf8'));
  console.log(firstObj);
  let user = firstObj.find(item => {
    return item.name === req.params.name
  })
  if(user) {
    res.send(user)
  } else {
    res.sendStatus(400);
  }
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
