import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

// Authentication and authorization of Admin

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.admintoken;
  
  if (!token) {
    console.log("No token found"); 
    return next(new ErrorHandler("Admin not authenticated", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resources`,
        401
      )
    );
  }
  next();
});

// Authentication and authorization of User


export const isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.usertoken;
  
  if (!token) {
    console.log("No token found"); 
    return next(new ErrorHandler("User not authenticated", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  
  if (req.user.role !== "User") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resources`,
        401
      )
    );
  }
  next();
});

// export const isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
//   const token = req.cookies.usertoken;

//   if (!token) {
//     console.log("No token found");
//     return next(new ErrorHandler("User not authenticated", 400));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await User.findById(decoded.id);
//     console.log("Decoded Token:", decoded);
//     console.log("User from Token:", req.user);

//     if (!req.user || req.user.role !== "User") {
//       console.log("User not found or not authorized");
//       return next(
//         new ErrorHandler(
//           `${req.user ? req.user.role : 'Unknown'} not authorized for this resources`,
//           401
//         )
//       );
//     }

//     next();
//   } catch (error) {
//     console.log("Token verification failed:", error);
//     return next(new ErrorHandler("Invalid token", 401));
//   }
// });

// Authentication and authorization of Teacher

export const isTeacherAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.teachertoken;
    if (!token) {
      return next(new ErrorHandler("Teacher not authenticated", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Teacher") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resources`,
          401
        )
      );
    }
    next();
  }
);
