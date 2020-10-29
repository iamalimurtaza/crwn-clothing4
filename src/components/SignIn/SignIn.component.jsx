import React from 'react';
import { auth, SignInWithGoogle } from '../../firebase/firebase.utils';
import CustomButton from '../CustomButton/CustomButton.component';
import Input from '../Input/Input.component';
import './SignIn.styles.scss';

class SignIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = this.state;
		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({
				email: '',
				password: '',
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
		const { email, password } = this.state;
		return (
			<div className='sign-in'>
				<h1 className='title'>I have an account.</h1>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<Input
						type='email'
						name='email'
						value={email}
						onChange={this.handleChange}
						labelText='Email Address'
					/>
					<Input
						type='password'
						name='password'
						value={password}
						onChange={this.handleChange}
						labelText='Password'
					/>
					<div className='buttons'>
						<CustomButton type='submit'>SIGN IN</CustomButton>
						<CustomButton onClick={SignInWithGoogle} type='button' googleSignIn>
							SIGN IN With Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}
export default SignIn;
