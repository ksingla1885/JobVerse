import { Application } from "../models/application.model";
import { Job } from "../models/job.model";

export const applyJob = async(req, res) => {
    try {
        const userId = req.body;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message: "Job Id not found",
                success: false
            })
        }

        //check whether the user had already applied for the particular job
        const existingApplication = await Application.findOne({job: jobId, applicant: userId});
    
        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        //create a new application
        const newApplication = await Application.create({
            job: jobId,
            application: userId
        });

        job.application.push(newApplication._id);
        await job.save();
        return res.status(201)/json({
            message: "Job applied successfully",
            success: true
        })
        
    } catch (error) {
        console.log(error);
    }
}


export const getAppliedJobs = async(req, res) => {
    try {
        const userID = req.id;
        const application = await Application.find({applicant: userID}).sort({createdAt: -1}).populate({
            path: "job",
            options: {sort: {createdAt: -1}},
            populate:{
                path: "company",
                options: {sort: {createdAt: -1}}
            }
        });
        
        if(!application){
            return res.status(404).json({
                message: "No application found",
                success: false
            })
        }

        return res.status(200).json({
            application,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}


//NUMBER OF USER WHO APPLIED FOR PARTICULAR JOB
export const getApplicants = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findByID({jobId}).populate({
            path: "applications",
            sort :{sort: {createdAt: -1}},
            populate:{
                path: "applicant",
                // options: {sort: {createdAt: -1}};
            }
        })

        if(!job){
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}



export const updateStatus = async(req, res) => {
    try {
        const {status} = req.body;
        const applications = req.params.id;

        if(!status){
            return res.status(400).json({
                message: "status is required",
                success: false
            });
        }

        //FIND APPLICATION USING APPLICATION ID

        const application = await Application.findOne({_id: applicant});
        if(!application){
            return res.status(404).json({
                message: "No application found",
                success: false
            })
        }
        
        //UPDATE STATUS
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "status updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}