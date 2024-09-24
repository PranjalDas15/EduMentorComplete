import express from 'express';
import {
    getConversations,
    getMessages,
    sendMessage
} from '../controllers/messageController.js';
import { isUserAuthenticated, isTeacherAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Send a message
router.post('/userSend/:id', isUserAuthenticated, sendMessage);
router.post('/teacherSend/:id', isTeacherAuthenticated, sendMessage);

// Get messages between two users
router.get('/user/:senderId/:receiverId', isUserAuthenticated, getMessages);
router.get('/teacher/:senderId/:receiverId', isTeacherAuthenticated, getMessages);

// Get all messages for a specific user
router.get('/userConversations/:id', isUserAuthenticated, getConversations);
router.get('/teacherConversations/:id', isTeacherAuthenticated, getConversations);

export default router;
