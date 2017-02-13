var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('expensedb', ['expensedb']);//database,[collections]
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/expenselist', function (req, res) {
    console.log('I received a GET request');

    db.expensedb.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });

});

app.post('/expenselist', function (req, res) {
    console.log(req.body);
    db.expensedb.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/expenselist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.expensedb.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/expenselist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.expensedb.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.put('/expenselist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.expensedb.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );
});

app.listen(3000);
console.log("Server running on port 3000");