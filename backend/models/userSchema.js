import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First Name should contain atleast 3 Characters"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last Name should contain atleast 3 Characters"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid Email"]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phone:{
        type: String,
        required: true,
        minLength: [10, "Phone number must contain exact 10 Digits"],
        maxLength: [10, "Phone number must contain exact 10 Digits"]
    },
    dob:{
        type: Date,
        required: [true, "DOB is required"],
    },
    gender:{
        type: String,
        required:true,
        enum: ["Male", "Female"]
    },
    
    role: {
        type: String,
        required: true,
        enum: ["Admin","Teacher","User"]
    },
    teacherBranch:{
        type: String
    },
    teacherAvatar: {
        public_id: String,
        url: String
    }
});


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema)