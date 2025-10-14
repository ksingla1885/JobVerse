/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import '../../App.css';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';
import { Loader2, Mail, Lock, User, Briefcase, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
    const { loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Reset loading state on component mount to ensure it's not stuck
        dispatch(setLoading(false));
    }, [dispatch]);

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (input.password !== input.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                // Redirect based on user role
                if (res.data.user.role === 'recruiter') {
                    navigate("/admin");
                } else if (res.data.user.role === 'student') {
                    navigate("/home");
                } else {
                    navigate("/");
                }
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Navbar />

            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <div className="w-full max-w-md">
                    {/* Signup Card */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                                <User className="h-8 w-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
                            <p className="text-blue-100">Join us and start your journey</p>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            <form onSubmit={submitHandler} className="space-y-6">

                                {/* Full Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="fullname" className="text-sm font-medium text-gray-700">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="fullname"
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={input.fullname}
                                            name="fullname"
                                            onChange={changeEventHandler}
                                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={input.email}
                                            name="email"
                                            onChange={changeEventHandler}
                                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={input.password}
                                            name="password"
                                            onChange={changeEventHandler}
                                            className="pl-10 pr-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            value={input.confirmPassword}
                                            name="confirmPassword"
                                            onChange={changeEventHandler}
                                            className="pl-10 pr-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Role Selection */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-gray-700">I am a:</Label>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                id="student"
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                type="radio"
                                                name="role"
                                                value="student"
                                                checked={input.role === "student"}
                                                onChange={changeEventHandler}
                                            />
                                            <Label htmlFor="student" className="flex items-center gap-2 cursor-pointer">
                                                <User className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-700">Student</span>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <input
                                                id="recruiter"
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                type="radio"
                                                name="role"
                                                value="recruiter"
                                                checked={input.role === "recruiter"}
                                                onChange={changeEventHandler}
                                            />
                                            <Label htmlFor="recruiter" className="flex items-center gap-2 cursor-pointer">
                                                <Briefcase className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-700">Recruiter</span>
                                            </Label>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </Button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-gray-500">Already have an account?</span>
                                    </div>
                                </div>

                                {/* Sign in link */}
                                <div className="text-center">
                                    <Link
                                        to="/login"
                                        className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                                    >
                                        Sign in here
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
