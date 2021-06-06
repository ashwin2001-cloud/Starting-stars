const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller.js');

router.get('/',homeController.home);


router.use('/candidate',require('./candidate'));
router.use('/recruiter',require('./recruiter'));

console.log('router.express is working....');
module.exports=router;