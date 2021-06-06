const Recruiter=require('../models/recruiter');
const Job=require('../models/job');

module.exports.profile = function(req, res){
    Job.find({})
    .populate('recruiter')
    //populated candidate of job also
    .populate({
        path:'candidate'
    })
    .exec(function(err,jobs){
        if(err){
            console.log('error in finding company jobs', err);
            return;
        }

        return res.render('recruiter_profile',{
            jobs:jobs
        });
    });
    // return res.render('recruiter_profile');
}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/recruiter/profile');
    }
    return res.render('recruiter_signup');
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/recruiter/profile');
    }
    return res.render('recruiter_signin');
}
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    Recruiter.findOne({email:req.body.email},function(err,recruiter){
        if(err){
            console.log('error in finding recruiter in signing up');
            return;
        }
        if(!recruiter){
            Recruiter.create(req.body,function(err,recruiter){
                if(err){
                    console.log('error in creating recruiter while sign-up...!!!!!!!!');
                    return;
                }
                return res.redirect('/recruiter/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}
//signin
module.exports.createSession=function(req, res){
    return res.redirect('/');
} 
//signout
module.exports.destroySession=function(req,res){
    /*Passport exposes a logout() function on req that can be called from any 
    route handler which needs to terminate a login session.
    Invoking logout() will remove the req.user property and clear the login session 
    */ 
    req.logout();
    //then redirecting to home page.
    return res.redirect('/');
} 