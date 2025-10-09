import express from 'express';

import { login , logout , updateProfile , register} from '../controllers/user.controller.js';

import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload, multipleUpload } from '../middleware/multer.js';

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, multipleUpload, updateProfile);

export default router;