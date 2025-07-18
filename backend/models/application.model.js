import mongoose from 'mongoose';

//applicatns k liye, konsi company main apply kiya hai aur kiss ne kiya hai


const applicationSchema  = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    status:{
        type:String,
        enum: ['pending', 'accepted', 'rejected'],
        default:"pending"
    }
}, {timeseries:true})

export const Application = mongoose.model("Application", applicationSchema);