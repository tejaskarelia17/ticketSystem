const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const app = express();
let db;

app.use(express.static('static'));

app.get('/api/bugs', function(req, res) {
  console.log("Query string", req.query);
  const filter = {};
  if (req.query.priority)
    filter.priority = req.query.priority;
  if (req.query.status)
    filter.status = req.query.status;

  db.collection("bugs").find(filter).toArray(function(err, docs) {
    res.json(docs);
  });
});

app.use(bodyParser.json());

app.post('/api/bugs/', function(req, res) {
  console.log("Req body:", req.body);
  const newBug = req.body;
  db.collection("bugs").insertOne(newBug, function(err, result) {
    const newId = result.insertedId;
    db.collection("bugs").find({_id: newId}).next(function(err, doc) {
      res.json(doc);
    });
  });
});

app.get('/api/bugs/:id', function(req, res) {
  db.collection("bugs").findOne({_id: ObjectId(req.params.id)}, function(err, bug) {
    res.json(bug);
  });
});

app.put('/api/bugs/:id', function(req, res) {
  const bug = req.body;
  console.log("Modifying bug:", req.params.id, bug);
  const oid = ObjectId(req.params.id);
  db.collection("bugs").updateOne({_id: oid}, bug, function(err, result) {
    db.collection("bugs").find({_id: oid}).next(function(err, doc) {
      res.send(doc);
    });
  });
});

MongoClient.connect('mongodb://localhost:27017/bugsdb', function(err, dbConnection) {
  db = dbConnection;
  const server = app.listen(3000, function () {
      const port = server.address().port;
      console.log("Started server at port", port);
  });
});
