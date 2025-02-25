var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get("/api/:date?", (req, res) => {
  let date;
  if (!req.params.date) {
    date = new Date();
  } else if (!isNaN(req.params.date)) {
    date = new Date(parseInt(req.params.date));
  } else {
    date = new Date(req.params.date);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});



app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
},(req, res) => { res.send({ time: req.time });});







var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
