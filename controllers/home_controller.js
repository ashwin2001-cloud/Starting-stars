const Job=require('../models/job');
module.exports.home=function(req,res){
    Job.find({}).populate('recruiter').exec(function(err,jobs){
        if(err){
            console.log('error in finding all jobs',err);
            return;
        }
        return res.render('home_page',{
            jobs:jobs
        });
    });
    
    
    

    // return res.render('home_page');
}