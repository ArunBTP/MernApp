// server.js
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const enquiryRoutes = require('./routes/enquiry');
require('dotenv').config();

const app = express();


// Middleware
app.use(express.json());

app.use(cors({
  origin: 'https://mern-app-iota-beryl.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/enquiry', enquiryRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});