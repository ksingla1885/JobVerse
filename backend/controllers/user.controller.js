
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js"; // ✅ imported getDataUri correctly
import cloudinary from "../utils/cloudinary.js";


//BUSINESS LOGIC FOR USER REGISTRATION
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const file = req.file;
        const fileUri = getDataUri(file); // ✅ CHANGED: correct usage of getDataUri
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content); // ✅ CHANGED: fixed .content usage

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with same email id",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


//BUSINESS LOGIC FOR USER LOGIN

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Incorrect role",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1h' });
       

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome Back ${user.fullname}`,
                user,
                success: true
            });

    } catch (error) {
        console.log(error);
    }
};


//BUSINESS LOGIC FOR USER LOGOUT

export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully",
                success: true
            });
    } catch (error) {
        console.log(error);
    }
};


//BUSINESS LOGIC FOR UPDATE PROFILE

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const resumeFile = req.files?.file?.[0]; // Resume file
        const profilePhotoFile = req.files?.profilePhoto?.[0]; // Profile photo file

        let cloudResponse;
        let profilePhotoResponse;

        // Handle resume upload
        if (resumeFile) {
            const fileUri = getDataUri(resumeFile);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        // Handle profile photo upload
        if (profilePhotoFile) {
            const fileUri = getDataUri(profilePhotoFile);
            profilePhotoResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // Update resume if uploaded
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = resumeFile.originalname;
        }

        // Update profile photo if uploaded
        if (profilePhotoResponse) {
            user.profile.profilePhoto = profilePhotoResponse.secure_url;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};
