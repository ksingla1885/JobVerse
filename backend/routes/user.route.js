import express from 'express';

import { login , logout , updateProfile , register} from '../controllers/user.controller.js';

import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, updateProfile);
router.route("/logout").get(logout);

export default router;