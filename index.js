'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.send("Hello, im in.");
  response.end();
})

app.post('/info', function(request, response) {
    var forename = request.body.result && request.body.result.parameters && request.body.result.parameters.playerforename ? request.body.result.parameters.playerforename : "Kein Vorname.";
    var lastname = request.body.result && request.body.result.parameters && request.body.result.parameters.playerlastname ? request.body.result.parameters.playerlastname : "Kein Nachname.";
    var information = request.body.result && request.body.result.parameters && request.body.result.parameters.information ? request.body.result.parameters.information : "Keine Information.";
    var teamname = request.body.result && request.body.result.parameters && request.body.result.parameters.teamname ? request.body.result.parameters.teamname : "Kein Teamname.";
    return response.json({
        speech: forename + " " + lastname + ". Information: " + information + ". Team: " + teamname + ".",
        displayText: forename + " " + lastname + ". Information: " + information + ". Team: " + teamname + ".",
        source: 'webhook-echo-sample'
    });
});

app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
