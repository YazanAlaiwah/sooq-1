import '@firebase/firestore';
import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyCjI352BwJ4ZgP-QKz0TgoMtewPTeVoLrY',
	authDomain: 'mobishop-ffcff.firebaseapp.com',
	databaseURL: 'https://mobishop-ffcff.firebaseio.com',
	projectId: 'mobishop-ffcff',
	storageBucket: 'mobishop-ffcff.appspot.com',
	messagingSenderId: '791414047785',
	appId: '1:791414047785:web:df2e418219331ffe'
};
firebase.initializeApp(firebaseConfig);
const dbh = firebase.storage();

export { dbh, firebase as default };
