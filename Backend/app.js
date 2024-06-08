import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/usersRoutes.js';
import applicationRoutes from './routes/applicationsRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import { dbconnect } from './database/dbconnection.js';
import { errorMiddleware } from './middleware/error.js';

const app = express();
dotenv.config();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'post', 'DELETE', 'PUT'],
    credentials: true,
}))

const errormiddleware = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err); // Delegate to default error handler if headers are already sent
    }
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

app.get('/some-route', async (req, res, next) => {
    try {
        const someData = await someAsyncFunction();
        res.json({ success: true, data: someData });
    } catch (error) {
        next(error);
    }
});

app.use(errormiddleware);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/job", jobRoutes);

dbconnect();

app.use(errorMiddleware)

export default app;