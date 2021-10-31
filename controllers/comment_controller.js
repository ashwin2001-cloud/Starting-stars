const Job = require('../models/job');
const Comment=require('../models/comments');

module.exports.create= async (req,res)=>{
    try{
        let comment= await Comment.create(req.body);
        let job= await Job.findById(req.body.product);
        job.comments.push(comment);
        job.save();
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.delete= async (req, res)=>{
    try{
        let id= req.query.id;
        let comment= await Comment.findById(id);
        if((comment.recruiter && comment.recruiter == req.user.id) || (comment.candidate && comment.candidate == req.user.id)){
            let commentDeleted= await Comment.findByIdAndDelete(id);
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}