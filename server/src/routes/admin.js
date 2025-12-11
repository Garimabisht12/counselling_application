// server/src/routes/admin.js
const express = require('express');
const router  = express.Router();

const {login, getStudents, updateStatus, getBranches}  = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/auth');
const allocationService = require('../services/allocationService');

/*  POST /api/v1/admin/login  */
router.post('/login', login);

/*  GET /api/v1/admin/students?status=&branch=  */
router.get('/students', protectAdmin, getStudents);

/*  PATCH /api/v1/admin/student/:id/status { status:"Accepted" }  */
router.patch('/student/:id/status', protectAdmin, updateStatus);

/*  PATCH /api/v1/admin/allocate  */


router.patch('/allocate', protectAdmin, async (req, res, next) => {
  try {
    const changes = await allocationService.allocate();  // ← array returned
    res.json({ message: 'Allocation completed', changes });
  } catch (err) {
    next(err);
  }
});

/* NEW: live seat status */
// router.get('/branches', protectAdmin, async (req, res) => {
//   const branches = await Branch.find().select('code name seatLimit seatsLeft');
//   res.json(branches);
// });


router.get('/branches', protectAdmin, getBranches);

router.patch('/student/:id/allocate', protectAdmin, allocationService.allocateOneStudent);


module.exports = router;
