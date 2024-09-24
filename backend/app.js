import express from 'express'
import { config } from 'dotenv';
import cors from 'cors'
import cookieParser from "cookie-parser"
import fileUpload from 'express-fileupload';
import { db } from './database/db.js';
import messageRouter from './router/messageRouter.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import userRouter from './router/userRouter.js'
import appointmentRouter from './router/appointmentRouter.js'
import conversationRouter from './router/conversationRouter.js';

const app = express();
config({path: "./config/config.env"});

app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.TEACHER_URL, process.env.ADMIN_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use('/api/v1/message', messageRouter);
app.use('/api/v1/conversation', conversationRouter);
app.use('/api/v1/users', userRouter)
app.use('/api/v1/appointment', appointmentRouter)

db();

app.use(errorMiddleware);
export default app;
