import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
  type: { type: String, required: true, enum: ['credit', 'debit'] },
}, {
  timestamps: true,
});

const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

export default Expense;
