// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function doItNow(req, res) {
  console.log(req.params.date)
  // Returns new date if date not provided
  let newDate;
  let date = req.params.date

  // Takes in unformatted date and formats and returns it
  function generateFormattedDate(rawDate) {
    let dateArray = rawDate.toString().split(" ")
    console.log(dateArray)
    return res.json({ unix: Math.floor(rawDate.getTime()), utc: `${dateArray[0]}, ${dateArray[2]} ${dateArray[1]} ${dateArray[3]} ${dateArray[4]} GMT` })
  }

  if (!date) {
    console.log("Inside false")
    newDate = new Date()
    // dateArray = newDate.toString().split(" ")
    return generateFormattedDate(newDate)
  }


  // If date is a number
  if (!isNaN(date)) {
    newDate = new Date(parseInt(date))
    // If date is a string
  } else {
    newDate = new Date(date)
  }

  // If invalid
  if (newDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" })
  }


  return generateFormattedDate(newDate)
}

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  console.log("inside")
  res.json({ greeting: 'hello API' });
});

app.get("/api/", (req, res) => {
  doItNow(req, res)
})

app.get("/api/:date", (req, res) => {
  doItNow(req, res)
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
