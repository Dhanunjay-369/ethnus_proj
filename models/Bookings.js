const mongoose=require("mongoose");

const bookingSchema=new mongoose.Schema({
    DoctorName:String,
    DoctorQualification:String,
    DoctorField:String,
    PatientName:String,
    BookingDate:String,
    BookingTime:String
});

const bookingModel=new mongoose.model("patientBooking",bookingSchema);

module.exports=bookingModel;