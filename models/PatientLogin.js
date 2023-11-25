const mongoose=require("mongoose");

const patientSchema=new mongoose.Schema({
    name:String,
    password:String
});

const patientModel=new mongoose.model("patients",patientSchema);

module.exports=patientModel;