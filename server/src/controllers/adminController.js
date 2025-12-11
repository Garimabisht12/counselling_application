// controllers/adminController.js
const mongoose = require('mongoose');
const Student  = require('../models/Student');
const Branch = require('../models/Branch'); 

const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const Admin   = require('../models/Admin');

const sign = (admin) =>
  jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // a) email must exist
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    // b) compare hashed pw
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ token: sign(admin) });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getStudents = async (req, res) => {
  try {
    const { status, branch } = req.query;

    // Build Mongo filter object
    const filter = {};
    if (status) filter.status = status;              // e.g. 'Pending'
    if (branch) filter.allocatedBranch = branch;     // e.g. 'CSE'

    // Fetch & sort
    const students = await Student.find(filter)
      .sort({ total: -1, name: 1 });

    res.json(students);                              // 200 OK
  } catch (err) {
    console.error('getStudents error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// controllers/adminController.js
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Prevent admin from setting Accepted/Rejected
  if (['Accepted', 'Rejected'].includes(status)) {
    return res.status(403).json({ message: 'Only the student can accept or reject.' });
  }

  // You can optionally keep the ability to reset to 'Pending'
  if (status !== 'Pending')
    return res.status(400).json({ message: 'Status can only be set to Pending.' });

  const updated = await Student.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  res.json(updated);
};


const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find().select('code name seatLimit seatsLeft');
    res.json(branches);
  } catch (err) {
    console.error('getBranches error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {getBranches, login, getStudents, updateStatus}
