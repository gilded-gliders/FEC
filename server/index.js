const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const api = require('./github.js')

app.use(express.json());
app.use(express.static('./public'));

app.listen(PORT, ()=>{
  console.log('connect')
});

app.get('/get', (req, res) => {
  //console.log('this is req: ', req, 'this is query: ', req.query);
  api.hrapi(`${req.query.endpoint}`, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      //console.log(data);
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
