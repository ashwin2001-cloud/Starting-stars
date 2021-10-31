const Recruiter=require('../models/recruiter');
const Job=require('../models/job');

module.exports.profile = async (req, res)=>{
    try{
        let jobs= await Job.find({})
        .populate('recruiter')
        //populated candidate of job also
        .populate({
            path:'candidate'
        });

        return res.render('recruiter_profile',{
            jobs:jobs
        });
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.signUp= async (req,res)=>{
    try{
        if(req.isAuthenticated()){
            return res.redirect('/recruiter/profile');
        }
        return res.render('recruiter_signup');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.signIn= async (req,res)=>{
    try{
        if(req.isAuthenticated()){
            return res.redirect('/recruiter/profile');
        }
        return res.render('recruiter_signin');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.create= async (req,res)=>{
    try{
        if(req.body.password!=req.body.confirm_password){
            return res.redirect('back');
        }
        let recruiter= await Recruiter.findOne({email:req.body.email});
        if(!recruiter){
            let newRecruiter= await Recruiter.create(req.body);
            return res.redirect('/recruiter/sign-in');
        }
        else return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.createSession= async (req, res)=>{
    return res.redirect('/');
} 

module.exports.destroySession= async (req,res)=>{
    /*Passport exposes a logout() function on req that can be called from any 
    route handler which needs to terminate a login session.
    Invoking logout() will remove the req.user property and clear the login session 
    */ 
    try{
        req.logout();
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return;
    }
} 