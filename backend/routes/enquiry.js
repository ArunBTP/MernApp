const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const newEnquiry = new Enquiry({ name, email });
  await newEnquiry.save();
  res.status(201).json({ message: 'Saved' });
});

module.exports = router;