//BUSINESS LOGIC FOR USER REGISTRATION

import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import {v2 as cloudinary} from "cloudinary";

export const register = async (req, res) => {
    try{
        const {fullname, email, phoneNumber, password, role} = req.body;

        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            });
        };

        const user = await User.findOne({email});
        if(user){
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
            role
        })
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    }
    catch(error){
        console.log(error);
    }
}


//BUSINESS LOGIC FOR USER LOGIN

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        //CHECK ROLE IS CORRECT OR NOT

        if(role !== user.role){
            return res.status(400).json({
                message: "Incorrect role",
                success: false
            })
        }


        //GENERATING TOKEN

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});

        user = {
            _id:user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message: `Welcome Back ${user.fullname}`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


//BUSINESS LOGIC FOR USER LOGOUT
export const logout = async(req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//BUSINESS LOGIC FOR UPDATE PROFILE
export const updateProfile = async(req, res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        // console.log(req.body);
        const file = req.file; //for resume file



        //CLOUDINARY LOGIC FOR UPLOADING RESUME
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id;  //middleware authentication
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        //UPDATE USER PROFILE DATA
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray


        //Resume's logic
            if(cloudResponse){
                user.profile.resume = cloudResponse.secure_url;   //save the cloudinary url
                user.profile.resumeOriginalName = file.originalname //save the original filename
            }



        await user.save();

        user = {
            _id:user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}