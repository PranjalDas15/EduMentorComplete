import { Conversation } from '../models/conversationSchema.js';
import ErrorHandler from '../middleware/errorMiddleware.js';

// Get all conversations for a specific user
export const getUserConversations = async (req, res, next) => {
    const userId = req.user._id;

    try {
        const conversations = await Conversation.find({
            participants: userId
        }).populate('messages');

        res.status(200).json({
            success: true,
            conversations,
        });
    } catch (error) {
        next(new ErrorHandler("Error fetching conversations", 500));
    }
};

// Create a conversation (if it doesn't exist)
export const createConversation = async (req, res, next) => {
    const { participants } = req.body;

    try {
        const conversation = await Conversation.create({
            participants,
            messages: []
        });

        res.status(201).json({
            success: true,
            conversation,
        });
    } catch (error) {
        next(new ErrorHandler("Error creating conversation", 500));
    }
};

// Get a specific conversation by ID
export const getConversationById = async (req, res, next) => {
    const { conversationId } = req.params;

    try {
        const conversation = await Conversation.findById(conversationId).populate('messages');
        if (!conversation) {
            return next(new ErrorHandler("Conversation not found", 404));
        }

        res.status(200).json({
            success: true,
            conversation,
        });
    } catch (error) {
        next(new ErrorHandler("Error fetching conversation", 500));
    }
};
