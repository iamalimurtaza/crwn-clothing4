import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyD7gXdQ8HKkz06esZotCnodKvgiGT-cJ0Q',
	authDomain: 'crwn-clothing4-pro.firebaseapp.com',
	databaseURL: 'https://crwn-clothing4-pro.firebaseio.com',
	projectId: 'crwn-clothing4-pro',
	storageBucket: 'crwn-clothing4-pro.appspot.com',
	messagingSenderId: '958063227241',
	appId: '1:958063227241:web:6667fb4a034675ea998df8',
	measurementId: 'G-H0MGKXFQ72',
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userObj, additionalData) => {
	if (!userObj) return;
	const userRef = firestore.doc(`users/${userObj.uid}`);
	const snapShot = await userRef.get();
	if (!snapShot.exists) {
		const { displayName, email } = userObj;
		const createdAt = firebase.firestore.FieldValue.serverTimestamp();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.error(error.message);
		}
	}
	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
