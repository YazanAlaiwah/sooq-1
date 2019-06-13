import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './compnents/login';
import Signup from './compnents/signup';
import Home from './compnents/homePage';
import SpacficCategory from './compnents/spacficCategoty';
import UserPage from './compnents/userPage';
import { Router, Scene } from 'react-native-router-flux';
import AddItem from './compnents/additem';
import apikeycnfig from './server/database/apikeycnfig';
import * as firebase from 'firebase';
export default class App extends React.Component {
	constructor(props) {
		super(props);

		firebase.initializeApp(apikeycnfig.FirebaseConfig);
	}

	render() {
		return (
			<Router>
				<Scene key="root">
					<Scene key="signup" component={Signup} hideNavBar={true} />
					<Scene key="spacficCategory" component={SpacficCategory} hideNavBar={true} />
					<Scene key="login" component={Login} hideNavBar={true} />
					<Scene key="userpage" component={UserPage} hideNavBar={true} />
					<Scene key="home" component={Home} hideNavBar={true} />
					<Scene key="additem" component={AddItem} initial hideNavBar={true} />
				</Scene>
			</Router>
		);
	}
}
