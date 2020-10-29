import React from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import CustomButton from '../CustomButton/CustomButton.component';
import Input from '../Input/Input.component';
import './SignUp.styles.scss';

class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;
		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			await createUserProfileDocument(user, { displayName });
			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};
	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<div className='sign-up'>
				<h1 className='title'>I do not have an account.</h1>
				<span>Sign up with your email and password.</span>
				<form onSubmit={this.handleSubmit}>
					<Input
						type='text'
						name='displayName'
						value={displayName}
						onChange={this.handleChange}
						labelText='Display Name'
					/>
					<Input
						type='email'
						name='email'
						value={email}
						onChange={this.handleChange}
						labelText='Email'
					/>
					<Input
						type='password'
						name='password'
						value={password}
						onChange={this.handleChange}
						labelText='Password'
					/>
					<Input
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={this.handleChange}
						labelText='Confirm Password'
					/>
					<CustomButton type='submit'>SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}
export default SignUp;
