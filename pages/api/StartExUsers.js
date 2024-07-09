import connectDB from '../../middleware/mongodb';
import User from '../../models/StartExRegisterUser';

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  if (method === 'POST') {
    const { name, department } = req.body;

    try {
      const user = await User.findOne({ name, department });

      if (user) {
        res.status(200).json({ role: user.role });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } 
  else if (method === 'GET') {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
