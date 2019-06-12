import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './compnents/login';
import Signup from './compnents/signup';
import Home from './compnents/homePage';
import SpacficCategory from './compnents/spacficCategoty';
import { Router, Scene } from 'react-native-router-flux';

export default function App() {
	return (
		<Router>
			<Scene key="root">
				<Scene key="signup" component={Signup} hideNavBar={true} />
				<Scene key="spacficCategory" component={SpacficCategory} hideNavBar={true} />
				<Scene key="login" component={Login} hideNavBar={true} />
				<Scene key="home" component={Home} initial hideNavBar={true} />
			</Scene>
		</Router>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
