import  express  from "express";
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import { v2 as cloudinary } from "cloudinary";
import cors from 'cors'
import bodyParser from "body-parser"



dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
  }));
app.use(express.json({limit: '10mb'})); //parse JSON data in the req.body
app.use(express.urlencoded({extended: true, limit: '10mb' })); //parse form data in the req.body, allows nested objects 
app.use(cookieParser());


//routes
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT} `))
