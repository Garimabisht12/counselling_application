const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const StudentSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true, unique: true },
  password:{ type: String, required: true },
  marks: {
    physics:   { type: Number, default: 0 },
    chemistry: { type: Number, default: 0 },
    maths:     { type: Number, default: 0 },
  },
  total:           { type: Number, default: 0 },
  preferences:     [String],         // e.g. ["CSE","ECE"]
  allocatedBranch: String,
  status: { type: String, enum: ['Pending','Accepted','Rejected'], default: 'Pending' },
}, { timestamps: true });

// 🧂 hash password before saving
StudentSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('Student', StudentSchema);
