const firebase = require('firebase/app/dist/index.cjs')
require('firebase/auth');
require('firebase/firestore');
const firebaseConfig = {
	apiKey: 'AIzaSyCR_T6ZDGzFRg9zp3JoVkueOEcsWRLQofI',
	authDomain: 'fir-faf42.firebaseapp.com',
	projectId: 'fir-faf42',
	storageBucket: 'fir-faf42.appspot.com',
	messagingSenderId: '464978064539',
	appId: '1:464978064539:web:a74535768b5583842c023e',
	measurementId: 'G-Z6MXNS8N9S',
};

const fbApp = firebase.initializeApp(firebaseConfig);
const db = fbApp.firestore();
const auth = firebase.auth();

export { db, auth };
