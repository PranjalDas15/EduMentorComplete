import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js'
import ErrorHandler from  '../middleware/errorMiddleware.js'
import { User } from '../models/userSchema.js'
import {generateToken} from '../utils/jwtToken.js'
import cloudinary from 'cloudinary'

// Registration

export const userRegister = catchAsyncErrors(async(req, res, next)=>{
    const {firstName, lastName, email, phone, password, gender, dob} = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob) {
        return next(new ErrorHandler("Please fill full form", 400));
    }
    let user = await User.findOne({ email });
    if(user) {
        return next(new ErrorHandler("User already registered", 400));
    }
    user =  await User.create({
        firstName, lastName, email, phone, password, gender, dob, role:"User"
    });
    generateToken(user, "User Registered", 200, res)
})

//User Login

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Password or email", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password", 400));
    }

    if (role !== user.role) {
        return next(new ErrorHandler("User with this role not found", 400));
    }
    generateToken(user, "User Logged in successfully", 200, res);
});



//All Teacher Details

export const getAllTeachers = catchAsyncErrors(async(req, res, next)=> {
    const teachers = await User.find({role: "Teacher"});
    res.status(200).json({
        success: true,
        teachers
    });
});

//All User Details

export const getAllUsers = catchAsyncErrors(async(req, res, next)=> {
    const users = await User.find({role: "User"});
    res.status(200).json({
        success: true,
        users
    });
});

// Loggedin User(admin, user and teacher) Detail

export const getUserDetails = catchAsyncErrors(async(req, res, next)=> {
    const user = req.user;
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        user,
    });
});

// Get specific Teacher Detail by id

export const getTeacherDetails = catchAsyncErrors(async (req, res, next) => {
    const { teacherId } = req.params;
    const teacher = await User.findOne({ _id: teacherId, role: "Teacher" });

    if (!teacher) {
        return next(new ErrorHandler("Teacher not found", 404));
    }

    res.status(200).json({
        success: true,
        teacher,
    });
});

// Logout Admin

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("admintoken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin logged out successfully"
    });
});

// Logout Teacher

export const logoutTeacher = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("teachertoken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Teacher logged out successfully"
    });
});

// Logout User

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("usertoken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logged out successfully"
    });
});

//Add New Teacher

export const addNewTeacher = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Teacher Avatar Required", 400));
    }
    const { teacherAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(teacherAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported", 400));
    }
    const { firstName, lastName, email, phone, password, gender, dob, teacherBranch } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !teacherBranch) {
        return next(new ErrorHandler("Please provide full details", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(teacherAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(new ErrorHandler("Cloudinary Error", 500));
    }
    
    const teacher = await User.create({
        firstName, lastName, email, phone, password, gender, dob, role: "Teacher", teacherBranch, teacherAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    res.status(200).json({
        success: true,
        message: "New Teacher Registered"
    });
});

//Add Admin

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob} = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob) {
        return next(new ErrorHandler("Please fill full form", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists`))
    }
    
    const admin = await User.create({firstName, lastName, email, phone, password, gender, dob, role:"Admin"});
    res.status(200).json({
        success: true,
        message: "New Admin Registered"
    })
})

