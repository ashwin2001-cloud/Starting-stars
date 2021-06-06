const express=require('express');
const router=express.Router();
const passport = require('passport');
const jobpostController=require('../controllers/jobpost_controller.js');

router.post('/create/:id', passport.checkAuthentication,jobpostController.create);
router.get('/description/:id',passport.checkAuthentication,jobpostController.description);
router.post('/apply',passport.checkAuthentication,jobpostController.jobApply);
router.get('/delete', passport.checkAuthentication, jobpostController.delete);
console.log('jobpost router is working....');
router.use('/comment',require('./comment'));
module.exports=router;