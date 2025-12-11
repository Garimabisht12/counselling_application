// server/src/seed/createAdmin.js
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const Admin    = require('../models/Admin');

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🗄️  MongoDB connected');

    const EMAIL    = 'admin@example.com';
    const PASSWORD = 'admin123';   
    const ROLE     = 'admin';

    const exists = await Admin.findOne({ email: EMAIL });
    if (exists) return console.log('Admin exists, skip');

    const admin = await Admin.create({ email: EMAIL, password: PASSWORD, role: ROLE });
    console.log('✅ Admin created:', { email: admin.email, password: PASSWORD });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();  