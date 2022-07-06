import Head from 'next/head';
import Router from 'next/router';

export default function SignUp() {
	const sendSignUpData = (e) => {
		e.preventDefault();
		var name = document.getElementById('name').value;
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		var userData = { name, email, password };

		fetch('http://localhost:3000/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((data) => {
				Router.push('/api/auth/signin');
			});
	};

	return (
		<div>
			<Head>
				<title>Sign Up</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='h-screen text-white bg-gradient-to-r from-emerald-500 to-cyan-700'>
				<div className='px-6 md:w-3/5 py-8 mx-auto'>
					<h1 className='text-2xl mb-4 text-center'>Sign Up Form</h1>
					<form onSubmit={sendSignUpData} className='text-center'>
						<input
							required
							id='name'
							placeholder='Name'
							type='text'
							className='outline-0 text-black w-4/5 p-2 w-full rounded-md'
						/>
						<input
							required
							id='email'
							type='email'
							placeholder='Email'
							className='outline-0 mt-2 text-black w-4/5 p-2 w-full rounded-md'
						/>
						<input
							required
							id='password'
							type='password'
							placeholder='Password'
							className='outline-0 mt-2 text-black w-4/5 p-2 w-full rounded-md'
						/>
						<button
							type='submit'
							className='outline-0 w-3/5 mx-auto rounded-md mt-2 bg-red-400 p-2'
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
