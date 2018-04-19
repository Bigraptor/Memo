const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const account = require("./route/account/account.js");
const memo = require("./route/memo/memo.js");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(morgan("dev"));
app.use(session({
    secret : "Bigraptor",
    resave : "false",
    saveUninitialized : true
}));

app.use("/account", account);
app.use("/blog", memo);
app.get("*", function(request, response){
    response.sendFile(path.resolve(__dirname, "./../front/public", "index.html"));
});

////////////////////////////////////////
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

////////////////////////////////////////
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
    console.log("MongoDB is Connected...");
});
mongoose.connect("mongodb://localhost/practice3");
////////////////////////////////////////

app.listen(4000, () => {
    console.log("Port 4000, Connected..");
});