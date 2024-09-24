import express from 'express';
import { getUserConversations, createConversation, getConversationById } from '../controllers/conversationController.js';
import { isUserAuthenticated, isTeacherAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isUserAuthenticated, getUserConversations);
router.post('/', isUserAuthenticated, createConversation);
router.get('/:conversationId', isUserAuthenticated, getConversationById);

export default router;
