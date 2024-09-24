import express from 'express'
import { deleteAppointment, getAllAppointment, postAppointment, updateAppointmentStatus, getUserAppointments } from '../controllers/appointmentController.js';
import { isUserAuthenticated, isTeacherAuthenticated } from '../middleware/auth.js'


const router = express.Router();

router.post("/post",isUserAuthenticated, postAppointment);
router.get("/getall",isTeacherAuthenticated, getAllAppointment);
router.get('/getme', isUserAuthenticated, getUserAppointments);
router.put("/update/:id",isTeacherAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id",isUserAuthenticated, deleteAppointment);

export default router