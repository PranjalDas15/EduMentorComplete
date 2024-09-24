import mongoose from 'mongoose'
import validator from 'validator'

const appointmentSchema = new mongoose.Schema({
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
    appointment_date:{
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    teacher:{
        firstName:{
            type: String,
            required: true},
        lastName:{
            type: String,
            required: true,
        },
    },
    //has visited at 2:51:17
    teacherId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }, 
});

export const Appointment = mongoose.model("Appointment", appointmentSchema)