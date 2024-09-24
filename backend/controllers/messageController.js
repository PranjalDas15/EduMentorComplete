import { Message } from '../models/messageSchema.js';
import { Conversation } from '../models/conversationSchema.js';
import ErrorHandler from '../middleware/errorMiddleware.js';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';

// Send a message   
// http://localhost:5000/api/v1/message/send/:id (for User Authorized) & (for Teacher Authorized)

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            })
        }

        if (!conversation.participants.includes(senderId)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to send messages in this conversation."
            });
        }

        const newMessage =  new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        

        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json({
            success: true,
            message: newMessage,
        });

    } catch (error) {

        if (error.code && error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Unique ID error or duplicate key issue.",
            });
        }
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// Get messages between two users
export const getMessages = async (req, res, next) => {
    try {
        const { senderId, receiverId } = req.params;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);
        
        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all messages for a specific user
export const getConversations = async (req, res) => {
    try {
      const id = req.params.id; 
      const conversations = await Conversation.find({
        participants: id,
      }).populate('messages'); 
  
      res.status(200).json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
