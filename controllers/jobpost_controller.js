  
const Job=require('../models/job');
  
const Candidate=require('../models/candidate');
module.exports.create=function(req,res){
    Job.create({
        position:req.body.jobposition,
        content:req.body.content,
        isActive:true,
        recruiter:req.params.id,
        startDate: req.body.startdate,
        applyBy: req.body.applyby,
        location: req.body.location,
        CTC: req.body.CTC
    },function(err){
        if(err){
            console.log('err in creating a job');
            return;
        }

        return res.redirect('back');
    });

}
// module.exports.description=function(req,res){
//     let jobid=req.params.id;
//     Job.findById(jobid)
//     .populate('recruiter')
//     .exec(function(err,job){
//         if(err){
//             console.log('error in loading the job');
//             return;
//         }
//         if(job){
//             return res.render('job_description',{
//                 job:job
//             });
//         }
//         else{
//             console.log('error in loading the job');
//             return;
//         }
//     })


// }

module.exports.description= async function(req,res){
    try{
        var jobid=req.params.id;
        let job= await Job.findById(jobid).populate('recruiter')
        .populate({
            path: 'comments',
            populate:{
                path: 'candidate'
            },
            populate:{
                path: 'recruiter'
            }
        });

        for(comment of job.comments){
            comment = await comment.populate('candidate', 'name').populate('recruiter', 'name').execPopulate();
        }

        return res.render('job_description',{
            job:job
        });
        
    }catch(err){
        console.log(err);
        return;
    }


}

//apply job
module.exports.jobApply=function(req,res){
    let jobid=req.query.id;
    console.log('jobid',jobid);
    Job.findById(jobid,function(err,job){
        if(err){
            console.log('err in finding job while applying',err);
            return;
        }
        if(job){
            let candidateId=req.query.id1;
            console.log('candidate id::',candidateId);
            Candidate.findById(candidateId,function(err, jobcandidate){
                if(err){
                    console.log('err in finding candidate  while applying',err);
                    return;
                }

                var satisfy=0;
                for(i of job.candidate){
                    if(i==candidateId){
                        satisfy=1;
                    }
                }
                if(satisfy==0){
                    console.log('++++++++', jobcandidate, '+++++++++++');
                    job.candidate.push(jobcandidate);
                    job.save();
                }
                
                return res.redirect('back');
            });
            
        }
        else{
            console.log('err in  finding job while applying ,no job here');
            return;
        }
    });




}

module.exports.delete= function(req, res){

    let id= req.query.id;
    Job.findById(id, function(err, job){
        if(err){
            console.log('error in deleting the review');
            return;
        }
        console.log('+++++++', job.recruiter, '+++++++', req.user.id, '+++++++');
        if(job.recruiter == req.user.id){
            Job.findByIdAndDelete(id, function(err){
                if(err){
                    console.log('error');
                    return;
                }
                
            })
        }
        return res.redirect('back');
    });
}