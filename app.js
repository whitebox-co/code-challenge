const express = require('express')
const app = express()
const exphbs  = require('express-handlebars');
const axios = require("axios");
const fetch = require("node-fetch");

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'))
app.use(express.static(__dirname + '/'));

const url = 'https://next.json-generator.com/api/json/get/EkzBIUWNL'
const data = fetch(url).then(response => response.json())
  .then( (result) => {
    return result
  })
  .catch(error => console.log('error:', error));

app.get('/', (req, res) => {
  data.then(result => {
    // let productArray = Object.keys(result).map(product => result[product])
    console.log("FIRST RESULT!", result[Object.keys(result)[0]])
    res.render('grid', {data: result});
  })
});

app.get('/product/:id', (req, res) => {
  const productId = req.params.id
  data.then(result => {
    const data = Object.keys(result).find(i => {
       return result[i].guid === productId
    })
    console.log(result[data])
    res.render('product', { data: result[data] })
  })
});


app.listen(process.env.port || 3000);
