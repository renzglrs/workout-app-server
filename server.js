require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();
const port = 4000;

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => console.log("Now connected to MongoDB  Atlas"));

if (require.main === module) {
  // "process.env.PORT || port" will use the environment variable if it is available OR will use port 4000 if none is defined
  app.listen(process.env.PORT || port, () => {
    console.log(`API is now online on port ${port}`);
  });
}