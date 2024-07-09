import connectDB from '../../middleware/mongodb';
import Expense from '../../models/StartExExpense';

export default async function handler(req, res) {
  await connectDB();
  
  const { method } = req;

  if (method === 'GET') {
    try {
      const expenses = await Expense.find({});
      res.status(200).json(expenses);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (method === 'POST') {
    const { amount, reason, type } = req.body;

    try {
      const newExpense = new Expense({ amount, reason, type });
      await newExpense.save();
      res.status(201).json(newExpense);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (method === 'DELETE') {
    const { id } = req.body;

    try {
      await Expense.findByIdAndDelete(id);
      res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
