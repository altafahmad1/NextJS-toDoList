import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import connectDB from '../../../utils/connectDB';
import User from '../../../models/userModel';
require('dotenv').config();

export default NextAuth({
	providers: [
		CredentialProvider({
			name: 'credentials',
			credentials: {
				username: {
					label: 'Email',
					type: 'email',
					placeholder: 'abc@examplemail.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				console.log('Connecting Database');
				await connectDB();
				console.log('Connection to Database Successful');

				const user = await User.findOne({ email: credentials.username });

				if (
					credentials.username === user.email &&
					credentials.password === user.password
				) {
					return {
						id: user._id,
						name: user.name,
						email: user.email,
					};
				}

				//failed login
				return null;
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
			}

			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.id = token.id;
			}

			return session;
		},
	},
	secret: process.env.JWT_SECRET,
	jwt: {
		secret: process.env.JWT_SECRET,
		encryption: true,
	},
});
