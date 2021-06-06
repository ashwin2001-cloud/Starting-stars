const mongoose=require('mongoose');

const recruiterSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        unique:true
    },
    companyname:{
        type:String,
        required:true
    },
    //the jobs which recruiter posted.....
    job:[{
        type:mongoose.Schema.Types.ObjectId,
        //name of model to be linked
        ref:'Job'
    }],
},{
    //to add a feature of 'created at' and 'updated at'.
    timestamps:true
});





const Recruiter=mongoose.model('Recruiter',recruiterSchema);
module.exports=Recruiter;