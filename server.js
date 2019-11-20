// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var allReservations = [{}
//     {
// routeName: "",
// name: "",
// number: "",

// }
];
var tablesCurrent = [];
var tablesWaitList = [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "main.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

// app.get("/tables/all", function (req, res) {
//     return res.json(allReservations);
// });

app.get("/reservations", function (req, res) {
    res.sendFile(path.join(__dirname, "results.html"));
    // var reservationsDiv = document.getElementById(reservations)
//    reservationsDiv.append(res.json(allReservations));
});

  app.get("/tables/current", function(req, res) {
    return res.json(tablesCurrent);
  });

  app.get("/tables/reserved", function(req, res) {
    return res.json(tablesWaitList);
  });

app.get("/tables/search/:reservation", function (req, res) {
    var chosen = req.params.reservation;
    console.log(chosen);

    for (var i = 0; i < allReservations.length; i++) {
        if (chosen === allReservations[i].routeName) {
            return res.json(allReservations[i]);
        }
    }
    return res.json(false);
})

app.post("/tables/all", function (req, res) {
    var newReservation = req.body;
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    allReservations.push(newReservation);
    res.json(newReservation);
    // if less than 5 reservations push to tablesCurrent
if(tablesCurrent.length >= 5){
    tablesWaitList.push(newReservation);
    console.log("waitlist: " + tablesWaitList)

    // res.json(newReservation);
}else{
    tablesCurrent.push(newReservation);
    console.log("Current: " + tablesCurrent)

    // res.json(newReservation);
}
// console.log(tablesCurrent);
// console.log(tablesWaitList);

});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


// function changetabledata(){
//     $.get("/tables/all", function (data) {
//         // console.log(data)

//         for (i = 0; i < data.length; i++) {

//             // console.log(data[i]);
//             if (data) {
//                 // $("#stats").show();
//                 var dataForReservations = 
//                 $("#name").text(data[i].name)+
//                 $("#number").text(data[i].number)+
//                 $("#email").text(data[i].email)+
//                 $("#id").text(data[i].uniqueID);
//             } else {
//                 $("#name").text(
//                     "Sorry no rervations found");
//                     // $("#stats").hide();
//                 }
                
//             } // end  of loop
// }