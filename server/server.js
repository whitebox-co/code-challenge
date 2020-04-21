const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');

const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({ Hello: 'World!' });
});

server.get('/products', (req, res) => {
	axios
		.get('https://next.json-generator.com/api/json/get/EkzBIUWNL')
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Internal Servor Error.' });
		});
});

server.get('/products/:guid', (req, res) => {
	const guid = req.params.guid;
	axios
		.get('https://next.json-generator.com/api/json/get/EkzBIUWNL')
		.then((response) => {
			singleProduct = response.data.find((product) => product.guid === guid);
			if (singleProduct === null) {
				res.status(404).json({ error: 'No product found.' });
			} else {
				res.status(200).json(singleProduct);
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Internal Servor Error.' });
		});
});

module.exports = server;
