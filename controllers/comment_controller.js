const Job = require('../models/job');
const Comment=require('../models/comments');

module.exports.create=function(req,res){
    
    Comment.create(req.body, function(err, comment){
        console.log('********', req.body, '**********');
        if(err){
            console.log('error in posting review');
            return;
        }
        Job.findById(req.body.product, function(err, job){
            if(err){
                console.log('Error in posting review for the product');
                return;
            }
            
            job.comments.push(comment);
            job.save();
        })
    })
    return res.redirect('back');
}

module.exports.delete= function(req, res){
    let id= req.query.id;
    
    Comment.findById(id, function(err, comment){
        if(err){
            console.log('error in deleting the review');
            return;
        }
        console.log('++++++', req.recruiter, '++++++');
        console.log('++++++', req.candidate, '++++++');
        console.log('++++++', req.user, '++++++');
        if((comment.recruiter && comment.recruiter == req.user.id) || (comment.candidate && comment.candidate == req.user.id)){
            Comment.findByIdAndDelete(id, function(err){
                if(err){
                    console.log('error');
                    return;
                }
                
            })
        }
        return res.redirect('back');
    });
}