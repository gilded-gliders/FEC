const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000 || process.env.PORT;
const api = require('./github');

app.use(express.json());
app.use(express.static('./public'));
// app.use('/:id', express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log('connect');
});

app.use('/get', (req, res) => {
  api.hrapi(`${req.query.endpoint}`, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      // console.log(data);
      res.status(200).send(data);
    }
  });
});

app.get('/post/review', (req, res) => {
  api.hrapi(`${req.query.endpoint}`, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      // console.log(data);
      res.status(200).send(data);
    }
  });
});

app.post('/cart', (req, res) => {
  var url = req.route.path.slice(1)
  console.log(req.body);
  api.post(`${url}`, req.body.quantity, JSON.parse(req.body.sku),  (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(data);
      res.status(201).send(data);
    }
  });
});
