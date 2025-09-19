const mongoose = require('mongoose');
// const enquirySchema = new mongoose.Schema({ name: String, email: String });
const enquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Enquiry', enquirySchema);