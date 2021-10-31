const Job=require('../models/job');

module.exports.home= async (req,res)=>{
    try{
        let jobs= await Job.find({}).populate('recruiter');
        return res.render('home_page',{
            jobs:jobs
        });
    }catch(err){
        console.log(err);
        return;
    }
    
}