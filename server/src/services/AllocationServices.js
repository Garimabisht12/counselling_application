// 1️⃣  Extend Branch schema
const BranchSchema = new mongoose.Schema({
  code:      String,
  name:      String,
  seatLimit: Number,
  seatsLeft: Number,            // NEW
  college:   { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
}, { timestamps: true });

// When you seed:
{ code: 'CSE', seatLimit: 60, seatsLeft: 60 }
