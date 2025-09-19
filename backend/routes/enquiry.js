const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

const authMiddleware = require('../middleware/auth');


router.get('/user', authMiddleware, async (req, res) => {
  const enquiries = await Enquiry.find({ userId: req.userId });
  res.json(enquiries);
});


// Submit enquiry (protected route)
router.post('/user', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const newEnquiry = new Enquiry({
      name,
      email,
      userId: req.userId // comes from decoded JWT token
    });

    await newEnquiry.save();
    res.status(201).json({ message: 'Enquiry saved successfully' });
  } catch (err) {
    console.error('Enquiry submission error:', err);
    res.status(500).json({ error: 'Failed to save enquiry' });
  }
});

module.exports = router;