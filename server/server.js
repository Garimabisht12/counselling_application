const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./src/config/db.js');

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT = process.env.CLIENT_URL || 'localhost:5173'

app.use(cors({
    origin: [CLIENT, 'http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}))

app.use(express.json());


// plugging routes into server.js
const authRoutes = require('./src/routes/auth.js');

app.get('/', (req, res) => {
  res.send('Welcome to the Counselling App API');
})

/* … after app.use(express.json()) … */
app.use('/api/v1/auth', authRoutes);

// student route

const studentRoutes = require('./src/routes/student.js');
app.use('/api/v1/student', studentRoutes);

// admin router

const adminRoutes = require('./src/routes/admin.js');

app.use('/api/v1/admin', adminRoutes);


app.get('/api/v1/health', (req, res) => {
  res.json({ message: 'Server is running 🏃‍♀️' });
});




app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

export default app;
