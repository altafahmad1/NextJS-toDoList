import connectDB from '../../../utils/connectDB';
import User from '../../../models/userModel';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
	console.log('Connecting Database');
	await connectDB();
	console.log('Connection to Database Successful');

	if (req.method === 'GET') {
		const tasks = await User.find(
			{ _id: req.query.userid },
			{ tasks: 1, _id: 0 }
		);
		res.status(200).json({ tasks });
	} else if (req.method === 'POST') {
		const { message } = req.body;
		const newTask = {
			_id: uuidv4(),
			message: message,
		};

		console.log('Task being created...');
		await User.findOneAndUpdate(
			{ _id: req.query.userid },
			{ $push: { tasks: newTask } }
		);
		console.log('Task created successfully');

		const tasks = await User.find(
			{ _id: req.query.userid },
			{ tasks: 1, _id: 0 }
		);

		res.status(200).json({ tasks });
	}
}
