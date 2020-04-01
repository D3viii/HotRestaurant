var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());


const reservationsTable = [{
    uniqueId: "reservation1",
    name: "Devin",
    phone: "808-hot-meme",
    email: "email@email.com"
},{
    uniqueId: "reservation2",
    name: "Pallavi",
    phone: "809-hot-meme",
    email: "email1@email.com"

}, {
    uniqueId: "reservation3",
    name: "Angel",
    phone: "807-hot-meme",
    email: "email2@email.com"
},
{
    uniqueId: "reservation4",
    name: "Alan",
    phone: "806-hot-meme",
    email: "email3@email.com"
}];

app.listen(PORT, function() {
    console.log("app listening on PORT: " + PORT);
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
  });

  app.get("/new", function(req, res) {
    res.sendFile(path.join(__dirname, "views/new.html"));
  });
  app.get("/reservations", function(req, res) {
    res.sendFile(path.join(__dirname, "views/reservations.html"));
  });
  app.get("/api/reservationsTable", function(req, res) {
      return res.json(reservationsTable);
  });
  app.get("/api/reservationsTable/:reservation", function(req, res) {
    var chosen = req.params.reservation;

    console.log(chosen);

    for (var i = 0; i < reservationsTable.length; i++) {
        if(chosen === reservationsTable[i].uniqueId) {
            return res.json(reservationsTable[i])
        }
    }
    return res.json(false)
  });
  //create New reservations
  app.post("/api/reservationsTable", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newReservation.name = newReservation.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newReservation);
  
    reservationsTable.push(newReservation);
  
    res.json(newReservation);
  });
