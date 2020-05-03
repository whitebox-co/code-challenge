const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const { urlencoded, json } = require('body-parser');
// const {} = require('./controllers/data.controller')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.use('*/public', express.static(path.join(__dirname, '../public')));

app.use('/deets', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './../product-detail.html'));
});
app.use('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './../product.html'));
});

// ### Global Error Handler ###
const defaultError = {
  log: 'Express error handler caught unknown middleware error',
  status: 400,
  message: {
    err: 'An error occurred',
  },
};
function errorHandler(err, req, res, next) {
  const errorObj = {
    ...defaultError,
    ...err,
  };
  console.error(errorObj.log);
  return res.json({
    status: errorObj.status,
    message: errorObj.message,
  });
}
app.use((err, req, res, next) => {
  return errorHandler(err, req, res, next);
});

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
