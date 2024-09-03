import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import cookieRoutes from './routes/cookieRoutes.js';

connectDB(); // Connect to mongoose

const app = express();
app.use(cors());


const port = process.env.PORT || 5000;

app.get("/", (req,  res) => {
    res.send("API is running...");
});

app.use('/api/cookies', cookieRoutes)


app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`));