const express=require('express');
const router=express.Router();
const passport = require('passport');
const candidateController=require('../controllers/candidate_controller.js');

router.get('/sign-up',candidateController.signUp);

router.get('/sign-in',candidateController.signIn);
router.post('/create',candidateController.create);
// router.post('/create-session',candidateController.createSession);
// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/candidate/sign-in'
    },
) ,candidateController.createSession);
router.get('/profile/:id',passport.checkAuthentication,candidateController.profile);
router.get('/sign-out',candidateController.destroySession);
console.log('candidate router is working....');
module.exports=router;