const passport=require('passport');
//imported passport-local module and especially Strategy property..
const LocalStrategy=require('passport-local').Strategy;
//imported candidate
const Candidate=require('../models/candidate');
// const Recruiter=require(0)
const Recruiter=require('../models/recruiter');
//authentication using passport.js
passport.use(new LocalStrategy({
    //usernameField is inbuilt..
     usernameField:'email'
    },
    function(email,password,done){
        //find the candidate and establish the identity
        Candidate.findOne({email:email},function(err,candidate){
            if(!err && candidate && candidate.password==password){
                console.log(candidate);
                return done(null,candidate);
            }
            Recruiter.findOne({email:email},function(err,recruiter){
                if(!err && recruiter && recruiter.password==password){
                    console.log(recruiter);
                    return done(null,recruiter);
                }
                console.log('invalid Username/Password');
                return done(null,false);
            });

        });

    }
));
//serialising the user and decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//deserialing the user  from the key in cookies
passport.deserializeUser(function(id,done){
    Candidate.findById(id,function(err,candidate){
        if(!err && candidate){
            console.log("deserialise",candidate);
            return done(null,candidate);
        }
        Recruiter.findById(id,function(err,recruiter){
            if(!err && recruiter){
                console.log("deserialise",recruiter);
                return done(null,recruiter);
            }
            if(err){
                console.log('error in finding user --> passport ');
                return done(err);
        
            }

        });


    });

});
passport.checkAuthentication=function(req,res,next){
    //if candidate is signed in then pass the request on next(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    //if candidate is not signed in
    return res.redirect('/candidate/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){

        /* req.candidate contains the current signed in candidate 
        from the session cookie and we are just sending 
        this to the locals for the views*/
        //imp :: in req officially keyword is 'user' for online person.
    //    res.locals.user=req.user;
       if(req.user.companyname){
            res.locals.recruiter=req.user;
            console.log('hello recruiter::::::',req.user);
       }
       else{
        res.locals.candidate=req.user;
        console.log('hello candidate::::::',req.user);
       }
    //    console.log(req);
    //    console.log('hello candidate::::::',req.user);


    }
    //to run the next process
    next();
}
module.exports=passport;