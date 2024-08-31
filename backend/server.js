import express from 'express';
import cookies from './data/cookies.js';
const port = 5000;

const app = express();

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