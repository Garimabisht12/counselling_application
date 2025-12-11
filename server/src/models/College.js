const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },  // e.g. "ABC"
    name: { type: String, required: true },               // "ABC Institute"
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('College', CollegeSchema);
