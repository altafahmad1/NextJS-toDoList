import connectDB from '../../../utils/connectDB';
import User from '../../../models/userModel';

export default async function handler(req, res) {
	console.log(req.body);

	if (req.method === 'GET') {
	} else if (req.method === 'POST') {
		const { name, email, password } = req.body;
		console.log('Connecting Database');
		await connectDB();
		console.log('Connection to Database Successful');

		console.log('User being created...');
		const user = User.create({
			name,
			email,
			password,
		});
		console.log('user created successfully');

		res.json({ user });
	}
}
