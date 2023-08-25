// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment-timezone');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//
app.get("/api/:date?", function(req, res) {
  const dateString = req.params.date;
  let date;

  if (!dateString) {
    date = moment().tz('UTC');
  } else if (!isNaN(dateString)) {
    date = moment(parseInt(dateString)).tz('UTC');
  } else {
    date = moment(dateString).tz('UTC');
  }

  if (!date.isValid()) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.valueOf(),
      utc: date.format("ddd, DD MMM YYYY HH:mm:ss [GMT]")
    });
  }
});



// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
