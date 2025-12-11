// server/src/middleware/auth.js
const jwt     = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin   = require('../models/Admin');

exports.protectStudent = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Student.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Not a student' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

exports.protectAdmin = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ message: 'Not an admin' });

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};
