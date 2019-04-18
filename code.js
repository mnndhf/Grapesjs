//import express
const express = require('express');
//import Body parser
const bodyParser = require('body-parser');
//import Mongoose
const mongoose = require('mongoose');
//initialize the app 
const app = express();
//Cors
const cors = require('cors')
//Load DB
const Template = require('./Template');

app.use(cors())

//configure bodyparser to json
app.use(bodyParser.json());

//Connect to mongoose and set connection variable
mongoose
    .connect('mongodb://localhost:27017/Grapesjs', {useNewUrlParser: true})
    .then(()  => {
        console.log('DB Connected')
    })
    .catch(err => console.log(err));

//post
app.post('/create-templates', (req,res) => {
    const newTemplate = new Template({
        name: req.body.name,
        html: req.body.html,
        css: req.body.css
    });

    console.log(req.body)

    //mongoose
    newTemplate.save()
    .then(() => res.json(newTemplate))
    .catch(err => res.json({err: err.message}))
})

app.get('/api/templates/:id', (req,res) => {
    Template.findOne({name: req.params.id}, function (err,template){
        res.json({result: template})
    })
})

//setup server port
var port = process.env.PORT || 3002;

//send message for default url
app.get('/', (req, res, next) => res.send("Hello World with Express"));

//launch app to listen to specified port
app.listen(port, function() {
    console.log("Running RestHub on port " + port);
});
