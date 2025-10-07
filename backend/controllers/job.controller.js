// backend/controllers/job.controller.js

import { Job } from "../models/job.model.js"

// ================= POST JOB =================
export const postJob = async (req, res) => {
  try {
    let { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

    console.log('Received job data:', {
      title, description, requirements, salary, location, jobType, experience, position, companyId
    });

    // Validate required fields
    if (!title || !description || !requirements || !location || !jobType || !companyId) {
      return res.status(400).json({ success: false, message: "String fields are required" });
    }

    // Validate number fields separately
    if (typeof salary !== 'number' || isNaN(salary) || salary < 0) {
      return res.status(400).json({ success: false, message: "Salary must be a valid positive number" });
    }

    if (typeof experience !== 'number' || isNaN(experience) || experience < 0) {
      return res.status(400).json({ success: false, message: "Experience must be a valid non-negative number" });
    }

    if (typeof position !== 'number' || isNaN(position) || position < 0) {
      return res.status(400).json({ success: false, message: "Position must be a valid non-negative number" });
    }

    // Convert requirements to array if it's a string
    if (typeof requirements === "string") {
      requirements = requirements.split(',').map(r => r.trim()).filter(Boolean);
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel: experience, // Map experience to experienceLevel
      position: position, // Map position to position
      company: companyId, // Map companyId to company
      createdBy: req.id, // set by isAuthenticated middleware
    });

    res.status(201).json({ success: true, message: "Job posted successfully", job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET ALL JOBS =================
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET JOB BY ID =================
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company")
      .populate("applications");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Normalize field names for frontend
    const normalizedJob = {
      ...job._doc,
      experience: job.experienceLevel,  // ✅ map experienceLevel → experience
      positions: job.position,          // ✅ map position → positions
    };

    res.status(200).json({ success: true, job: normalizedJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// export const getJobById = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id).populate("company").populate("applications");
//     if (!job) return res.status(404).json({ success: false, message: "Job not found" });

//     res.status(200).json({ success: true, job });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// ================= GET ADMIN JOBS =================
export const getAdminJobs = async (req, res) => {
  try {
    const userId = req.id; // ✅ fixed typo (was req.idl earlier)
    console.log("User ID : ",userId);

  const jobs = await Job.find({ createdBy: userId })
      .populate("company")
      .populate("applications");

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
