import express from 'express';
import cors from 'cors';
import { connectDB } from './db/database.js';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js'
import { errorMiddleware } from './middleware/error.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"]
};
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT_SECRET, 
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false }
  })
);
app.use("/api", cors(corsOptions), indexRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(errorMiddleware)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})