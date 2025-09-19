const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const enquiryRoutes = require('./routes/enquiry');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// ✅ Middleware: JSON parser
app.use(express.json());

// ✅ CORS configuration
const allowedOrigins = [
  'http://localhost:3000', // local dev
  'https://mern-app-iota-beryl.vercel.app' // deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true
}));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiry', enquiryRoutes);


// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});