import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieRoutes from './routes/cookieRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express()
app.use(cors({ origin: 'http://localhost:3000' }));
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/cookies', cookieRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});