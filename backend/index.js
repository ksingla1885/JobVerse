import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'


dotenv.config({});

const app = express();



//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // <-- Correct
  credentials: true
}));

// app.use(cors(corsOptions));



//API's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// http://localhost:8000/api/v1/user/register
// http://localhost:8000/api/v1/user/login
// http://localhost:8000/api/v1/user/profile/update


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on ${PORT}`);
})