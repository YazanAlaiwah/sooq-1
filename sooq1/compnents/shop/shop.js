import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { Actions } from 'react-native-router-flux';
import { View, Text, Button } from 'react-native';
// import console = require('console');

export default class Shop extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Header />
				<Button onPress={() => Actions.addshop()} title="+ add you'r shop" color="orange" />
				<Footer />
			</View>
		);
	}
}
