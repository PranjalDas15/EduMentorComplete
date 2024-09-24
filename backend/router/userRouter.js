import express from "express";
import {
  addNewAdmin,
  addNewTeacher,
  getAllTeachers,
  getAllUsers,
  getUserDetails,
  getTeacherDetails,
  login,
  logoutAdmin,
  logoutUser,
  userRegister,
  logoutTeacher,
} from "../controllers/userController.js";
import {
  isAdminAuthenticated,
  isTeacherAuthenticated,
  isUserAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/teachers", getAllTeachers);
router.get("/users", getAllUsers);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/user/me", isUserAuthenticated, getUserDetails);
router.get("/teacher/me", isTeacherAuthenticated, getUserDetails);
router.get("/teachers/:teacherId", getTeacherDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/teacher/logout", isTeacherAuthenticated, logoutTeacher);
router.get("/user/logout", isUserAuthenticated, logoutUser);
router.post("/teacher/addnew", isAdminAuthenticated, addNewTeacher);

export default router;
