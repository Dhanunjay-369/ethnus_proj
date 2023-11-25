
const express = require("express");
const mongoose = require("mongoose");
const patientRoute = require("./controller/patientRoute.js");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

mongoose.set("strictQuery",true); //Deprection Warning //To supress warning
// mongoose.connect("mongodb+srv://test:12345@cluster0.bkk3fg5.mongodb.net/schooldb");
// mongoose.connect("mongodb://127.0.0.1:27017/appointment_booking");
mongoose.connect("mongodb+srv://dhanu369:369@test.gj5qniu.mongodb.net/");
var db = mongoose.connection;
db.on("open",()=>console.log("Connected to DB"));
db.on("error",()=>console.log("Error occurred"));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use("/patientRoute",patientRoute);

app.listen(3001,()=>{
    console.log("Server started at 3001");
})