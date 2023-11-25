const express=require('express');
// const mongoose=require('mongoose');
// const cors=require('cors');

// const PatientModel=require("../models/PatientLogin.js");
const PatientDetailsModel=require("../models/PatientDetails.js");
const CurrentUserModel=require("../models/CurrentUser.js");
const BookingModel=require('../models/Bookings.js');

const patientRoute=express.Router();
// app.use(cors());
//app.use(express.json());

// mongoose.set('strictQuery', true);
// mongoose.connect("mongodb://127.0.0.1:27017/appointment_booking");
// mongoose.connect("mongodb+srv://dhanunjayareddykurakula:eVNfiBLDJjKOF6iN@cluster0.bnccbi4.mongodb.net/");

patientRoute.put("/delete/:id",(req,res)=>{
    const {id}=req.params;
    console.log("Cancelling:"+id);
    BookingModel.findByIdAndDelete({_id:id})
    .then(res.json("Success"))
    .catch(err=>res.json(err))
})

patientRoute.post("/bookings",(req,res)=>{
     const user=req.body.PatientName;
     console.log("Sending "+user+" Bookings");
     BookingModel.find({PatientName:user})
     .then(patientBooking=>res.json(patientBooking))
     .catch(err=>res.json(err))
 })


 patientRoute.get("/bookings",(req,res)=>{
    const DefaultJSONId="6561b9440765f02775c18e5f";//"655898346afa43bd7a03b6bd";
    const User=CurrentUserModel.findOne({_id:DefaultJSONId})
    .then(User=>{
        if(User)
        {
            res.json(User);
        }
        else{
            res.json("User Not Found");
        }
    })
    .catch(err=>console.log(err))
})


patientRoute.post("/booknow/confirm_booking",(req,res)=>{
    const docName=req.body.DoctorName;
    const docQual=req.body.DoctorQualification;
    const docField=req.body.DoctorField;
    const date=req.body.BookingDate;
    const time=req.body.BookingTime;
    // const pname="dhanu";

    console.log(docName);
    console.log(docQual);
    console.log(docField);
    console.log(date);
    console.log(time);

    const DefaultJSONId="6561b9440765f02775c18e5f" //"655898346afa43bd7a03b6bd";

    let pname="";

    const User=CurrentUserModel.findOne({_id:DefaultJSONId})
    .then(User=>{console.log(User);
        if(User)
        {
            pname=User.CurrentUser;
            console.log("Patient Name:"+pname);
            BookingModel.create({
                DoctorName:docName,
                DoctorQualification:docQual,
                DoctorField:docField,
                BookingDate:date,
                BookingTime:time,
                PatientName:pname
            })
            .then(patientBooking=>res.json(patientBooking))
            .catch(err=>res.json(err))
        }
    })
    .catch(err=>console.log(err));

    // console.log(User.CurrentUser);
    
})

// app.get("/header",(req,res)=>{
//     PatientDetailsModel.findOne
// })

patientRoute.post("/signup",(req,res)=>{
    const userEmail=req.body.Email;
    const userName=req.body.UserName;
    const userPassword=req.body.Password;
    console.log("User Name:"+userName);
    console.log("User Password:"+userPassword);
    const ExistingPatient=PatientDetailsModel.findOne({Email:userEmail});

    if(ExistingPatient)
    {
        const UpdatedUser= PatientDetailsModel.findOneAndUpdate(
            {Email:userEmail},{UserName:userName,Password:userPassword},{new:true}
        )
        .then(res.json("Success"))
        .catch(err=>res.json(err))
    }
})

patientRoute.post("/filldetails",(req,res)=>{
    const pname=req.body.FullName;
    const page=req.body.Age;
    const pemail=req.body.Email;
    const pmobile=req.body.MobileNumber;
    console.log("Name:"+pname);
    console.log("Age:"+page);
    console.log("Email:"+pemail);
    console.log("Mobile:"+pmobile);
    PatientDetailsModel.create({
        FullName:pname,
        Age:page,
        Email:pemail,
        MobileNumber:pmobile
    })
    .then(res.json("Success"))
    .catch(err=>res.json(err))
})

patientRoute.post("/login", async (req, res) => {
    try {

        const DefaultJSONId="6561b9440765f02775c18e5f";   //"655898346afa43bd7a03b6bd";

        const uname = req.body.UserName;
        const upassw = req.body.Password;

        console.log("LoginUserName:"+uname);
        console.log("LoginUserPassword:"+upassw);

        const patientExist = await PatientDetailsModel.findOne({ UserName: uname });

        if (patientExist) {
            if (patientExist.Password === upassw) {

                CurrentUserModel.findOneAndUpdate({_id:DefaultJSONId},{CurrentUser:uname},{new:true})
                .then(currentUser=>console.log("Updated Current User:"+currentUser))
                .catch(err=>console.log(err))

                const updatedPatient = PatientDetailsModel.findOneAndUpdate({UserName:uname},{LoginStatus:true},{new:true})
                .then(patientDetails=>console.log(patientDetails))
                .catch(err=>console.log(err))
                res.json("Success");
            } else {
                res.json("Incorrect");
            }
        } else {
            res.json("Invalid");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});


// app.post("/loginpage",(req,res)=>{
//     const uname=req.body.UserName;
//     const upassw=req.body.Password;
//     console.log(uname);
//     console.log(upassw);
//     const patientExist=PatientDetailsModel.findOne({UserName:uname})
//     .then(patientExist=>res.json(patientExist))
//     .catch(err=>res.json(err))
//     // if(patientExist)
//     // {
//     //      if(patientExist.Password==upassw)
//     //      {
//     //          res.json("Success");
//     //      }
//     //      else{
//     //          res.json("Incorrect Password");
//     //      }
//     //  }
//     //  else{
//     //      res.json("User Does not Exist");
//     //  }
// })



module.exports=patientRoute;