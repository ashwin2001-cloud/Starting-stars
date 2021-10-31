  
const Job=require('../models/job');
  
const Candidate=require('../models/candidate');
module.exports.create= async (req,res)=>{
    try{
        let job= await Job.create({
            position:req.body.jobposition,
            content:req.body.content,
            isActive:true,
            recruiter:req.params.id,
            startDate: req.body.startdate,
            applyBy: req.body.applyby,
            location: req.body.location,
            CTC: req.body.CTC
        });
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }

}

module.exports.description= async (req,res)=>{
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
module.exports.jobApply= async (req,res)=>{
    try{
        let jobid=req.query.id;
        console.log('jobid',jobid);
        let job= await Job.findById(jobid);
        if(job){
            let candidateId=req.query.id1;
            let jobcandidate= await Candidate.findById(candidateId);
            var satisfy=0;
            for(i of job.candidate){
                if(i==candidateId){
                    satisfy=1;
                }
            }
            if(satisfy==0){
                await job.candidate.push(jobcandidate);
                job.save();
            }
            return res.redirect('back');   
        }
        else{
            console.log('err in  finding job while applying ,no job here');
            return;
        }
    }catch(err){
        console.log(err);
        return;
    }

}

module.exports.delete= async (req, res)=>{
    try{
        let id= req.query.id;
        let job= await Job.findById(id);
        if(job.recruiter == req.user.id){
            let jobDeleted= await Job.findByIdAndDelete(id);
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}