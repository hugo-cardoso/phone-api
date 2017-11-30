const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const appRouter = express.Router();

const url = "mongodb://localhost:27017/hugo";

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

function createData(data) {
  return {
    "date": new Date(),
    "devices": data
  };
}

let insertDocument = (db, callback) => {
  db.collection('collectionTeste').insertOne( {
    "id": "XT1071",
    "brand": "Samsung",
    "name": "Galaxy S8+",
    "size": "141.5 x 70.7 x 11 mm",
    "weight": "149g",
    "network": {
      "gsm": "Quad Band (850/900/1800/1900)",
      "dual_sim": true,
      "sim_card": "Micro",
      "wifi": "802.11b/g/n",
      "bluetooth": "4.0 com A2DP/LE",
      "usb": "Micro USB 2.0",
      "nfc": false,
      "gps": "A-GPS/GLONASS",
      "radio": true,
      "tv": false,
      "mobile_data": {
        "types": "3G/4G",
        "down_max": "21 Mbs",
        "up_max": "5.76 Mbs"
      }
    },
    "sensors": {
      "acelerometer": true,
      "proximity": true,
      "giroscope": true,
      "compass": true
    },
    "battery": {
      "type": "Litio",
      "amp": "2070 Mah"
    }
  }, (err, result) => {
   assert.equal(err, null);
   console.log("Inserted a document into the restaurants collection.");
 });
};

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   insertDocument(db, function() {
//       db.close();
//   });
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

appRouter.get('/devices', (req, res, next) => {

  let findRestaurants = (db, callback) => {
    db.collection('collectionTeste').find().toArray((err, items) => {
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
    db.collection('collectionTeste').find({"id": id.toUpperCase()}).toArray((err, items) => {
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
    db.collection('collectionTeste').distinct("brand").toArray((err, items) => {
      assert.equal(err, null);
      console.log(items);
      // res.json(items);
    });
  };
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

app.use('/', appRouter);

app.listen(process.env.PORT || 8080);