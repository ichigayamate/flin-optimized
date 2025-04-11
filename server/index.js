const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

// connecting to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(`Connected to MongoDB server`);
}).catch((err => {
  throw new Error("Could not connect to MongoDB\n" + err);
}));

// Middleware
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
