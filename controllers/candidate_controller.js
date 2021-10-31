const Candidate=require('../models/candidate');


module.exports.profile= async (req,res)=>{
    try{
        let candidate= await Candidate.findById(req.params.id);
        return res.render('candidate_profile', {
            profile_candidate:candidate
        });
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.signUp= async (req,res)=>{
    try{
        if(req.isAuthenticated()){
            return res.redirect('/candidate/profile');
        }
        return res.render('candidate_signup');
    }catch(err){
        console.log(err);
        return;
    }
}
module.exports.signIn= async (req,res)=>{
    try{
        if(req.isAuthenticated()){
            return res.redirect('/candidate/profile/');
        }
        return res.render('candidate_signin');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.create= async (req,res)=>{
    
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    let candidate= await Candidate.findOne({email:req.body.email});
    if(!candidate){
        let newCandidate= await Candidate.create(req.body);
        return res.redirect('/candidate/sign-in');
    }
    else return res.redirect('back');
}

module.exports.createSession= async (req,res)=>{
    try{
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return;
    }
}
//signout
module.exports.destroySession= async (req,res)=>{
    /*Passport exposes a logout() function on req that can be called from any 
    route handler which needs to terminate a login session.
    Invoking logout() will remove the req.user property and clear the login session 
    */ 
    try{
        req.logout();
        //then redirecting to home page.
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.addResume= async (req, res)=>{
    try{
        let candidate= await Candidate.findById(req.body.id);
        if(candidate){
            candidate.linkedin= req.body.linkedin;
            candidate.save();
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}