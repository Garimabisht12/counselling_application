const Student   = require('../models/Student');
const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcryptjs');

const genToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Missing required fields' });

    const exists = await Student.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    const student = await Student.create({  name, email, password });
    const token   = genToken(student);

    res.status(201).json({ token, student });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = genToken(student);
    res.json({ token, student });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
