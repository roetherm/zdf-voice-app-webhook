'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/info', function(req, res) {
    var forename = req.body.result && req.body.result.parameters && req.body.result.parameters.playerforename ? req.body.result.parameters.playerforename : "Kein Vorname.";
    var lastname = req.body.result && req.body.result.parameters && req.body.result.parameters.playerlastname ? req.body.result.parameters.playerlastname : "Kein Nachname.";
    var information = req.body.result && req.body.result.parameters && req.body.result.parameters.information ? req.body.result.parameters.information : "Keine Information.";
    var teamname = req.body.result && req.body.result.parameters && req.body.result.parameters.teamname ? req.body.result.parameters.teamname : "Kein Teamname.";
    console.log("test");
    return res.json({
        speech: forename + " " + lastname + ". Information: " + information + ". Team: " + teamname + ".",
        displayText: forename + " " + lastname + ". Information: " + information + ". Team: " + teamname + ".",
        source: 'webhook-echo-sample'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
