// server/src/routes/student.js
const express = require('express');
const router  = express.Router();
const {
  getMe,
  updateMarks,
  savePreferences,
  makeDecision
} = require('../controllers/studentController');
const { protectStudent } = require('../middleware/auth');

router.get('/me',          protectStudent, getMe);
router.put('/marks',       protectStudent, updateMarks);
router.put('/preferences', protectStudent, savePreferences);
router.put('/decision', protectStudent, makeDecision);

module.exports = router;
