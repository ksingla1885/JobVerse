import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

// POST a job (Admin only)
router.post("/post", isAuthenticated, postJob);

// Get all jobs
router.get("/get", isAuthenticated, getAllJobs);

// Get jobs posted by the logged-in admin
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

// Get a single job by ID
router.get("/get/:id", isAuthenticated, getJobById);

export default router;
