import connectDB from '../../../../utils/connectDB';
import User from '../../../../models/userModel';

export default async function handler(req, res) {
	console.log('Connecting Database');
	await connectDB();
	console.log('Connection to Database Successful');

	if (req.method === 'DELETE') {
		console.log('Task being deleted...');
		console.log(req.query);
		await User.findOneAndUpdate(
			{ _id: req.query.userid },
			{ $pull: { tasks: { _id: req.query.taskid } } }
		);

		const tasks = await User.find(
			{ _id: req.query.userid },
			{ tasks: 1, _id: 0 }
		);

		res.status(200).json({ tasks });
	}
}
