const mongoose=require('mongoose');

const patientDetailsSchema=new mongoose.Schema({
    UserName:String,
    Password:String,
    FullName:String,
    Age:String,
    Email:String,
    MobileNumber:String,
    LoginStatus:{
        type:Boolean,
        default:false
    }
})

const patientDetailsModel=new mongoose.model("patientDetails",patientDetailsSchema);

module.exports=patientDetailsModel;