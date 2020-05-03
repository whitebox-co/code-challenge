const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const { urlencoded, json } = require('body-parser');
const { getMany, getSingle } = require('./controllers/data.controller');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('*/public', express.static(path.join(__dirname, '../public')));

app.get('/GetMany', getMany);
app.get('/GetSingle/:guid', getSingle);

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
