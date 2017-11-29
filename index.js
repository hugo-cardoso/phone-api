const express = require('express');
const app = express();
const brands = require('./data/brands.json');
const devices = require('./data/devices.json');
const appRouter = express.Router();

function createData(data) {
  return {
    "date": new Date(),
    "devices": data
  };
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

appRouter.get('/devices', (req, res, next) => {
  res.json(createData(devices));
})

appRouter.get('/devices/:id', (req, res, next) => {
  const id = req.params.id;
  const filterItems = devices.filter(item => item.id.toLowerCase() === id.toLowerCase());
  res.json(createData(filterItems));
})

appRouter.get('/devices/brand/:id', (req, res, next) => {
  const id = req.params.id;
  const filterItems = devices.filter(item => item.brand.toLowerCase() === id.toLowerCase());
  res.json(createData(filterItems));
})

appRouter.get('/brands', (req, res) => {
  res.json(createData(brands));
})

app.use('/', appRouter);

app.listen(process.env.PORT || 8080);