const mongoose=require('mongoose');

const candidateSchema=new mongoose.Schema({
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
    }
},{
    //to add a feature of 'created at' and 'updated at'.
    timestamps:true
});





const Candidate=mongoose.model('Candidate',candidateSchema);
module.exports=Candidate;