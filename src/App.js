import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Home from './pages/Home/Home.component';
import Shop from './pages/Shop/Shop.component';
import SignInSignUp from './pages/SignInSignUp/SignInSignUp.component';
import { setCurrentUser } from './redux/user/userActions';

class App extends React.Component {
	unSubscribeFromAuth = null;
	componentDidMount() {
		const { setCurrentUser } = this.props;
		this.unSubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userInfo = await createUserProfileDocument(user);
				userInfo.onSnapshot((snapshot) => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
					console.log(this.state);
				});
			} else {
				setCurrentUser(user);
				console.log(this.state);
			}
		});
	}

	componentWillUnmount() {
		this.unSubscribeFromAuth();
	}
	render() {
		return (
			<div className='App'>
				<Header />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/shop' component={Shop} />
					<Route
						path='/sign-in'
						render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInSignUp />)}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
