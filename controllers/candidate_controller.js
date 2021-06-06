const Candidate=require('../models/candidate');


module.exports.profile=function(req,res){
    // return res.render('candidate_profile');
    Candidate.findById(req.params.id,function(err,candidate){
        return res.render('candidate_profile', {
            
            profile_candidate:candidate

        });
    });



}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/candidate/profile');
    }
    return res.render('candidate_signup');
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/candidate/profile/');
    }
    return res.render('candidate_signin');
}
//sign-up
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    Candidate.findOne({email:req.body.email},function(err,candidate){
        if(err){
            console.log('error in finding candidate in signing up');
            return;
        }
        if(!candidate){
            Candidate.create(req.body,function(err,candidate){
                if(err){
                    console.log(err);
                    console.log('error in creating candidate while sign-up...!!!!!!!!');
                    return;
                }
                return res.redirect('/candidate/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}
//sign-in
// module.exports.createSession=function(req,res){
    




// }
//signin
module.exports.createSession=function(req,res){
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