import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  query: { type: String, required: true },
  assignto: { type: String, required: true, enum: ['admin', 'finance', 'hr', 'user'] },
  status: { type: String, required: true, enum: ['pending', 'resolved'], default: 'pending' },
}, {
  timestamps: true,
});

const Query = mongoose.models.Query || mongoose.model('Query', querySchema);

export default Query;
