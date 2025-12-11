const Student = require('../models/Student');
const Branch  = require('../models/Branch');

/* ---------------------------------------------------------------
   PATCH /api/v1/admin/student/:id/allocate
   Body: { branch: "CSE" }
--------------------------------------------------------------- */
exports.allocateOneStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { branch } = req.body;          // chosen branch code

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (student.allocatedBranch)
      return res.status(400).json({ message: 'Student already allocated' });

    if (!student.preferences.includes(branch))
      return res.status(400).json({ message: 'Branch not in preference list' });

    // find branch with an available seat
    const br = await Branch.findOneAndUpdate(
      { code: branch, seatsLeft: { $gt: 0 } },
      { $inc: { seatsLeft: -1 } },
      { new: true }
    );
    if (!br)
      return res.status(400).json({ message: 'No seats left in this branch' });

    student.allocatedBranch = branch;
    student.status = 'Pending';
    await student.save();

    res.json({ success: true, student });
  } catch (err) {
    console.error('allocateOneStudent error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.allocate = async () => {
  const changes = [];                   // ← NEW

  const students = await Student.find({ allocatedBranch: null })
                                .sort({ total: -1 });

  for (const s of students) {
    for (const pref of s.preferences) {
      // atomic seat decrement
      const branch = await Branch.findOneAndUpdate(
        { code: pref, seatsLeft: { $gt: 0 } },
        { $inc: { seatsLeft: -1 } },
        { new: true }
      );
      if (!branch) continue;

      s.allocatedBranch = branch.code;
      s.status = 'Pending';
      await s.save();

      changes.push({
        id: s._id,
        name: s.name,
        branch: branch.code,
        total: s.total
      });
      break;
    }
  }

  return changes;                       // ← return list
};