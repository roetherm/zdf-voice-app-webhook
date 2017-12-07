'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/info', function(req, res) {
    var forename = req.body.result && req.body.result.parameters && req.body.result.parameters.playerforename ? req.body.result.parameters.playerforename : "Kein Vorname."
    var lastname = req.body.result && req.body.result.parameters && req.body.result.parameters.playerlastname ? req.body.result.parameters.playerlastname : "Kein Nachname."
    var information = req.body.result && req.body.result.parameters && req.body.result.parameters.information ? req.body.result.parameters.information : "Keine Information."
    var teamname = req.body.result && req.body.result.parameters && req.body.result.parameters.teamname ? req.body.result.parameters.teamname : "Kein Teamname."
    return res.json({
        speech: forename + " " + lastname + ". Information: " + information + ". Team: " + teamname + ".",
        displayText: forename + " " + lastname + ". Information: " + information + ". Team: " + teamname + ".",
        source: 'webhook-echo-sample'
    });
});

restService.post('/music', function(req, res) {
    var speech = "";
    switch (req.body.result.parameters.AudioSample.toLowerCase()) {
        case "music":
            speech = '<speak>  <audio src="https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg">did not get your MP3 audio file</audio></speak>';
            break;
        case "delay":
            speech = '<speak>Let me take a break for 3 seconds. <break time="3s"/> I am back again.</speak>';
            break;
    }
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});

restService.post('/video', function(req, res) {
    return res.json({
        speech: '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
        displayText: '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
        source: 'webhook-echo-sample'
    });
});



restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});




restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
