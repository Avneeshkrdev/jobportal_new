import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allowed origins
const allowedOrigins = ['http://localhost:5173', 'https://jobportal-uixz.onrender.com', 'https://jobportal-snowy.vercel.app','http://localhost:8000']; // Add your allowed origins here

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            console.log(`Origin: ${origin} is allowed by CORS`);
            callback(null, true);
        } else {
            console.log(`Origin: ${origin} is not allowed by CORS`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
