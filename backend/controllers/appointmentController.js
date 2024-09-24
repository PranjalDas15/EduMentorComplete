import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js'
import ErrorHandler from '../middleware/errorMiddleware.js'
import { Appointment } from '../models/appointmentSchema.js'
import { User } from '../models/userSchema.js'

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    console.log('Request Body:', req.body);
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        date,
        time,
        branch,
        teacher_firstName,
        teacher_lastName
    } = req.body

    if (!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !dob ||
        !gender ||
        !date ||
        !time ||
        !branch ||
        !teacher_firstName ||
        !teacher_lastName) {
            return next(new ErrorHandler("Please fill full form", 400));
        }
    
    const appointmentDate = `${date} ${time}`;
    
    const isConflict = await User.find({
        firstName: teacher_firstName,
        lastName: teacher_lastName,
        role: "Teacher",
        teacherBranch: branch
    })

    if(isConflict.length === 0) {
        return next(new ErrorHandler("Teacher not Found"))
    }

    if(isConflict.length > 1) {
        return next(new ErrorHandler("Teacher conflict please contact through email or phone"))
    }

    const teacherId = isConflict[0]._id;
    const userId = req.user._id;
    const appointment = await Appointment.create({
            firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            appointment_date: appointmentDate,
            branch,
            teacher: {
                firstName: teacher_firstName,
                lastName: teacher_lastName,
            },
            teacherId,
            userId
    })

    res.status(200).json({
        success: true,
        message: "Appointment created successfully",
        appointment
    });

});

// export const getAllAppointment = catchAsyncErrors(async (req, res, next) => {
//     const appointments = await Appointment.find()
//     res.status(200).json({
//         success: true,
//         appointments
//     })
// })

export const getAllAppointment = catchAsyncErrors(async (req, res, next) => {
    const teacherId = req.user._id;
    const appointments = await Appointment.find({ teacherId });

    res.status(200).json({
        success: true,
        appointments,
    });
});

export const getUserAppointments = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const appointments = await Appointment.find({ userId });

    if (!appointments || appointments.length === 0) {
        return next(new ErrorHandler("No appointments found for this user", 404));
    }

    res.status(200).json({
        success: true,
        appointments
    });
});

export const updateAppointmentStatus = catchAsyncErrors(async(req, res, next) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id)

    if(!appointment) {
        return next(new ErrorHandler("Appointment not found", 404))
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Appointment status Updated",
        appointment,
    })
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id)

    if(!appointment) {
        return next(new ErrorHandler("Appointment not found", 404))
    }

    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointment deleted"
    })
})


