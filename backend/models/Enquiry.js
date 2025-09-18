const mongoose = require('mongoose');
const enquirySchema = new mongoose.Schema({ name: String, email: String });
module.exports = mongoose.model('Enquiry', enquirySchema);