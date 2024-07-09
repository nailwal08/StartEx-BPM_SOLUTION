import connectDB from '../../middleware/mongodb';
import Query from '../../models/StartExQueryModel';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const { name, query, assignto } = req.body;

    try {
      const newQuery = new Query({ name, query, assignto, status: 'pending' });
      await newQuery.save();
      res.status(201).json(newQuery);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'GET') {
    const { assignto } = req.query;

    try {
      const queries = await Query.find({ assignto, status: 'pending' });
      res.status(200).json(queries);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    const { id } = req.body;

    try {
      const query = await Query.findById(id);
      if (!query) {
        res.status(404).json({ message: 'Query not found' });
      } else {
        query.status = 'resolved';
        await query.save();
        res.status(200).json(query);
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
