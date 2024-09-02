import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import connectDB from './config/db.js';
import cookies from './data/cookies.js';

connectDB(); // Connect to mongoose

const app = express();
app.use(cors());


const port = process.env.PORT || 5000;

app.get("/", (req,  res) => {
    res.send("API is running...");
});

app.get('/api/cookies', (req, res) => {
    res.json(cookies);
});

app.get('/api/cookies/:id', (req, res) => {
    const cookie = cookies.find((c) => c._id == req.params.id);
    res.json(cookie);
})



app.listen(port, () => console.log(`Server is running on port ${port}`));