const express=require('express');
const router=express.Router();
const passport = require('passport');
const recruiterController=require('../controllers/recruiter_controller.js');

router.get('/sign-up',recruiterController.signUp);
router.get('/profile',passport.checkAuthentication,recruiterController.profile)
router.get('/sign-in',recruiterController.signIn);
router.get('/sign-out',recruiterController.destroySession);
router.post('/create',recruiterController.create);
// router.use('/jobpost',);
router.use('/jobpost',require('./jobpost'));
// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/recruiter/sign-in'
    },
) ,recruiterController.createSession);
console.log('recruiter router is working....');
module.exports=router;


