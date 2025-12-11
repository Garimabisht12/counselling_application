// src/seed/branchSeed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Branch = require('../models/Branch');

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🗄️  MongoDB connected');

    const branches = [
      { code: 'CSE', name: 'Computer Science and Engineering', seatLimit: 60, seatsLeft: 60 },
      { code: 'ECE', name: 'Electronics and Communication Engineering', seatLimit: 60, seatsLeft: 60 },
      { code: 'ME', name: 'Mechanical Engineering', seatLimit: 60, seatsLeft: 60 },
    ];

    for (const branch of branches) {
      const exists = await Branch.findOne({ code: branch.code });
      if (exists) {
        console.log(`⚠️  Branch ${branch.code} already exists, skipping...`);
        continue;
      }

      const created = await Branch.create(branch);
      console.log(`✅ Branch created:`, { code: created.code, seatsLeft: created.seatsLeft });
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
})();
