const mongoose=require("mongoose");

const CurrentUserSchema=new mongoose.Schema({
    Admin:{
        type:String,
        default:"Dhanu"
    },
    CurrentUser:{
        type:String,
        default:"Dhanu"
    }
});

const CurrentUserModel=new mongoose.model("currentUser",CurrentUserSchema);

module.exports=CurrentUserModel;