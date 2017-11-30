const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const appRouter = express.Router();
const bodyParser = require('body-parser');

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/hugo";

app.use(bodyParser.json());

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

appRouter.get('/devices', (req, res, next) => {

  let findRestaurants = (db, callback) => {
    db.collection('phones').find().toArray((err, items) => {
      assert.equal(err, null);
      res.json(items);
    });
  };

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findRestaurants(db, function() {
        db.close();
    });
  });
})

appRouter.get('/devices/:id', (req, res, next) => {
  const id = req.params.id;
  
  let findRestaurants = (db, callback) => {
    db.collection('phones').find({"name": {$regex : ".*" + id.toLowerCase() + ".*", $options: "-i"}}).toArray((err, items) => {
      assert.equal(err, null);
      res.json(items);
    });
  };

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findRestaurants(db, function() {
        db.close();
    });
  });
});

appRouter.get('/devices/brand/:id', (req, res, next) => {
  const id = req.params.id;

  let findRestaurants = (db, callback) => {
    db.collection('phones').find({"brand": {$regex : ".*" + id.toLowerCase() + ".*", $options: "-i"}}).toArray((err, items) => {
      assert.equal(err, null);
      console.log(items);
      res.json(items);
    });
  };

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findRestaurants(db, function() {
        db.close();
    });
  });
})

appRouter.get('/brands', (req, res) => {

  let findRestaurants = (db, callback) => {
    db.collection('collectionTeste').distinct("brand", (err, items) => {
      res.json(items);
    });
  };

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findRestaurants(db, function() {
        db.close();
    });
  });
})

// Admin

appRouter.route('/addDevice').post((req, res, next) => {

  const data = req.body;

  const device = (db, callback) => {
    db.collection('phones').insertOne(data , (err, result) => {
      assert.equal(err, null);
      console.log("Data inserted.");
    });
  };

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    device(db, function() {
      db.close();
    });
  });

  res.json(req.body);
})


app.use('/admin', express.static(__dirname + '/public'));

app.use('/', appRouter);

app.listen(process.env.PORT || 8080);