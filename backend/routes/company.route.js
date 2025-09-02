// import express from 'express';

// import { registerCompany , getCompany , getCompanyById , updateCompany } from '../controllers/company.controller.js';

// import isAuthenticated from '../middleware/isAuthenticated.js';
// import { singleUpload } from '../middleware/multer.js';

// const router = express.Router();

// router.route("/register").post(isAuthenticated, registerCompany);

// router.route("/").get(isAuthenticated, getCompany); //changed
// // router.route("/get").get(isAuthenticated, getCompany);

// router.route("/get/:id").get(isAuthenticated, getCompanyById);
// router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

// export default router;






// companyRoutes.js
import express from 'express';
import {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany
} from '../controllers/company.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

// Register a new company
router.route("/register").post(isAuthenticated, registerCompany);

// Get all companies for logged-in user
router.route("/").get(isAuthenticated, getCompany);

// Get single company by ID
router.route("/get/:id").get(isAuthenticated, getCompanyById);

// Update company by ID
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

export default router;
