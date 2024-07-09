import connectDB from '../../middleware/mongodb';
import Inventory from '../../models/StartExInventory';

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  if (method === 'GET') {
    try {
      const items = await Inventory.find({});
      res.status(200).json(items);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (method === 'POST') {
    const { item, quantity, price } = req.body;

    try {
      const newItem = new Inventory({ item, quantity, price });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (method === 'DELETE') {
    const { id } = req.body;

    try {
      await Inventory.findByIdAndDelete(id);
      res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
