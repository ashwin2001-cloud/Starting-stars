const express=require('express');
const router=express.Router();
const commentController=require('../controllers/comment_controller');
const passport= require('passport');

// router.get('/delete', passport.checkAuthentication, reviewController.delete);
router.post('/createComment', passport.checkAuthentication, commentController.create);
router.get('/deleteComment', passport.checkAuthentication, commentController.delete);

module.exports=router;