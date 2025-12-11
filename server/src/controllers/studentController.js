// server/src/controllers/studentController.js
const mongoose = require('mongoose');
const Student  = require('../models/Student');

/*--------------------------------------------------
  GET /student/me   (protected)
--------------------------------------------------*/
exports.getMe = (req, res) => {
  res.json({ success: true, student: req.user });
};

/*--------------------------------------------------
  PUT /student/marks   (protected)
  Body: { physics, chemistry, maths }
--------------------------------------------------*/
exports.updateMarks = async (req, res) => {
  try {
    const { physics, chemistry, maths } = req.body;

    // 1) All three numbers must be present and 0‑100
    const nums = [physics, chemistry, maths].map(Number);
    if (nums.some((n) => Number.isNaN(n) || n < 0 || n > 100)) {
      return res
        .status(400)
        .json({ success: false, message: 'Marks must be numbers 0‑100' });
    }

    // 2) Mutate the already‑loaded doc and save (triggers hooks)
    req.user.marks = { physics: nums[0], chemistry: nums[1], maths: nums[2] };
    req.user.total = nums.reduce((a, b) => a + b, 0); // explicit total
    await req.user.save();

    res.json({ success: true, student: req.user });
  } catch (err) {
    console.error('updateMarks error:', err);
    console.error('register error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/*--------------------------------------------------
  PUT /student/preferences   (protected)
  Body: { preferences: ["CSE","ECE","ME"] }
--------------------------------------------------*/
exports.savePreferences = async (req, res) => {
  try {
    let { preferences } = req.body;

    if (!Array.isArray(preferences) || !preferences.length) {
      return res
        .status(400)
        .json({ success: false, message: 'preferences must be non‑empty array' });
    }

    // Trim, uppercase, remove blanks
    preferences = preferences
      .map((p) => p.trim().toUpperCase())
      .filter(Boolean);

    if (!preferences.length) {
      return res
        .status(400)
        .json({ success: false, message: 'preferences list is empty after cleaning' });
    }

    req.user.preferences = preferences;
    await req.user.save();

    res.json({ success: true, student: req.user });
  } catch (err) {
    console.error('savePreferences error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /student/decision   { decision:"Accepted" | "Rejected" }
exports.makeDecision = async (req, res) => {
  const { decision } = req.body;
  if (!['Accepted', 'Rejected'].includes(decision))
    return res.status(400).json({ message: 'decision must be Accepted or Rejected' });

  if (!req.user.allocatedBranch)
    return res.status(400).json({ message: 'No branch allocated yet' });

  if (req.user.status !== 'Pending')
    return res.status(400).json({ message: 'Decision already made' });

  req.user.status = decision;
  await req.user.save();
  res.json({ success: true, student: req.user });
};
